import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

const mockOrganization: any = {
  _id: 'anyid',
  name: 'name #1',
  address: 'address #1',
  description: 'description #1',
  customers: 'customers #1',
};

const createOrganizationDto: CreateOrganizationDto = {
  name: 'name #1',
  address: 'address #1',
  description: 'description #1',
  customers: 'customers #1',
};

const updateOrganizationDto: UpdateOrganizationDto = {
  name: 'name update',
  address: 'address update',
  description: 'description update',
  customers: 'customers update',
};

describe('Organizations Controller', () => {
  let organizationsController: OrganizationsController;
  let organizationsService: OrganizationsService;
  const paginationQueryDto: PaginationQueryDto = {
    limit: 10,
    offset: 1,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationsController],
      providers: [
        {
          provide: OrganizationsService,
          useValue: {
            create: jest.fn(() => []),
            findAll: jest.fn(() => []),
            findOne: jest.fn(() => mockOrganization),
            update: jest.fn(() => {}),
            remove: jest.fn(() => {}),
          },
        },
      ],
    }).compile();

    organizationsController = module.get<OrganizationsController>(
      OrganizationsController
    );
    organizationsService =
      module.get<OrganizationsService>(OrganizationsService);
  });

  it('should be defined', () => {
    expect(organizationsController).toBeDefined();
  });

  describe('getAllOrganization()', () => {
    it('should call method findAll in OrganizationsService', async () => {
      await organizationsController.getAllOrganization(paginationQueryDto);
      expect(organizationsService.findAll).toHaveBeenCalled();
    });
  });

  describe('getOrganization()', () => {
    it('should call method findOne in OrganizationsService id with correct value', async () => {
      await organizationsController.getOrganization('anyid');
      expect(organizationsService.findOne).toHaveBeenCalled();
    });
  });

  describe('addOrganization()', () => {
    it('should call method create in OrganizationsService with correct values', async () => {
      const createOrganizationSpy = jest.spyOn(organizationsService, 'create');
      await organizationsController.addOrganization(createOrganizationDto);
      expect(createOrganizationSpy).toHaveBeenCalledWith(createOrganizationDto);
    });

    it('should throw an exception if it not create a organization', async () => {
      organizationsService.create = jest
        .fn()
        .mockRejectedValueOnce(BadRequestException);
      expect(
        organizationsController.addOrganization({
          name: 'not correct name',
          address: 'not correct address',
          description: 'not correct description',
          customers: 'not correct customers',
        })
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('updateOrganization()', () => {
    it('should call method update in OrganizationsService with correct values', async () => {
      const updateSpy = jest.spyOn(organizationsService, 'update');
      await organizationsController.updateOrganization(
        'anyid',
        updateOrganizationDto
      );
      expect(updateSpy).toHaveBeenCalledWith('anyid', updateOrganizationDto);
    });

    it('should throw an exception if it not update a organization', async () => {
      organizationsService.update = jest
        .fn()
        .mockRejectedValueOnce(BadRequestException);
      expect(
        organizationsController.updateOrganization('not correct id', {
          name: 'not correct name update',
          address: 'not correct address update',
          description: 'not correct description update',
          customers: 'not correct customers update',
        })
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('deleteOrganization()', () => {
    it('should call method remove in OrganizationsService with correct value', async () => {
      const deleteSpy = jest.spyOn(organizationsService, 'remove');
      await organizationsController.deleteOrganization('anyid');
      expect(deleteSpy).toHaveBeenCalledWith('anyid');
    });
  });
});
