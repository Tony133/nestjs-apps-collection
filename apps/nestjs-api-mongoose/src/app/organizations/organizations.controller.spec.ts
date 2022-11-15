import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { NotFoundException } from '@nestjs/common';

class MockResponse {
  res: any;
  constructor() {
    this.res = {};
  }
  status = jest
    .fn()
    .mockReturnThis()
    .mockImplementationOnce((code) => {
      this.res.code = code;
      return this;
    });
  send = jest
    .fn()
    .mockReturnThis()
    .mockImplementationOnce((message) => {
      this.res.message = message;
      return this;
    });
  json = jest
    .fn()
    .mockReturnThis()
    .mockImplementationOnce((json) => {
      this.res.json = json;
      return this;
    });
}

const createOrganizationDto: CreateOrganizationDto = {
  name: 'name #1',
  address: 'address #1',
  description: 'description #1',
  customers: 'customers #1',
};

const updateOrganizationDto: UpdateOrganizationDto = {
  name: 'name update',
  address: 'address update',
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

  const response = new MockResponse();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationsController],
      providers: [
        {
          provide: OrganizationsService,
          useValue: {
            create: jest.fn(() => []),
            findAll: jest.fn(() => []),
            findOne: jest.fn(() => {}),
            update: jest.fn(() => {}),
            remove: jest.fn(() => {}),
          },
        },
      ],
    }).compile();

    organizationsController = module.get<OrganizationsController>(
      OrganizationsController,
    );
    organizationsService =
      module.get<OrganizationsService>(OrganizationsService);
  });

  it('should be defined', () => {
    expect(organizationsController).toBeDefined();
  });

  describe('getAllOrganization()', () => {
    it('should call method findAll in OrganizationsService', async () => {
      await organizationsController.getAllOrganization(
        response,
        paginationQueryDto,
      );
      expect(organizationsService.findAll).toHaveBeenCalled();
    });

    it('should throw if OrganizationsService findAll throws', async () => {
      jest
        .spyOn(organizationsService, 'findAll')
        .mockRejectedValueOnce(new NotFoundException());
      await expect(
        organizationsController.getAllOrganization(
          response,
          paginationQueryDto,
        ),
      ).rejects.toThrow(new NotFoundException());
    });

    it('should return organization on success', async () => {
      await organizationsController.getAllOrganization(
        response,
        paginationQueryDto,
      );
      expect(organizationsService.findAll).toHaveBeenCalled();
    });
  });

  describe('getOrganization()', () => {
    it('should call method findOne in OrganizationsService id with correct value', async () => {
      await organizationsController.getOrganization(response, 'anyid');
      expect(organizationsService.findOne).toHaveBeenCalled();
    });

    it('should throw if OrganizationsService findOne throws', async () => {
      jest
        .spyOn(organizationsService, 'findOne')
        .mockRejectedValueOnce(new NotFoundException());
      await expect(
        organizationsController.getOrganization(response, 'anyid'),
      ).rejects.toThrow(new NotFoundException());
    });

    it('should return a organization on success', async () => {
      await organizationsController.getOrganization(response, 'anyid');
      expect(organizationsService.findOne).toHaveBeenCalled();
    });
  });

  describe('addOrganization()', () => {
    it('should call method create in OrganizationsService with correct values', async () => {
      const createSpy = jest.spyOn(organizationsService, 'create');
      await organizationsController.addOrganization(
        response,
        createOrganizationDto,
      );
      expect(createSpy).toHaveBeenCalledWith(createOrganizationDto);
    });

    it('should return a organization on success', async () => {
      const createOrganizationSpy = jest.spyOn(organizationsService, 'create');
      await organizationsController.addOrganization(
        response,
        createOrganizationDto,
      );
      expect(createOrganizationSpy).toHaveBeenCalledWith(createOrganizationDto);
    });
  });

  describe('updateOrganization()', () => {
    it('should call method update in OrganizationsService with correct values', async () => {
      const updateSpy = jest.spyOn(organizationsService, 'update');
      await organizationsController.updateOrganization(
        response,
        'anyid',
        updateOrganizationDto,
      );
      expect(updateSpy).toHaveBeenCalledWith('anyid', updateOrganizationDto);
    });
  });

  describe('deleteOrganization()', () => {
    it('should call method remove in OrganizationsService with correct value', async () => {
      const deleteSpy = jest.spyOn(organizationsService, 'remove');
      await organizationsController.deleteOrganization(response, 'anyid');
      expect(deleteSpy).toHaveBeenCalledWith('anyid');
    });

    it('should throw error if id in OrganizationsService not exists', async () => {
      jest
        .spyOn(organizationsService, 'remove')
        .mockRejectedValueOnce(new NotFoundException());
      await expect(
        organizationsController.deleteOrganization(response, 'anyid'),
      ).rejects.toThrow(new NotFoundException());
    });
  });
});
