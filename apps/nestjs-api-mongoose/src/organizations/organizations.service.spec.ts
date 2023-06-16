import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationsService } from './organizations.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrganizationsProfile } from './interfaces/organizations-profile';

const mockOrganization: any = {
  _id: 'anyid',
  name: 'name #1',
  address: 'address #1',
  description: 'description #1',
  customers: 'customer #1',
};

const organizationsArray = [
  {
    _id: 'anyid',
    name: 'name #1',
    address: 'address #1',
    description: 'description #1',
    customers: 'customer #1',
  },
  {
    _id: 'anyid',
    name: 'name #2',
    address: 'address #2',
    description: 'description #2',
    customers: 'customer #2',
  },
];

const createOrganizationDto = {
  name: 'name #1',
  address: 'address #1',
  description: 'description #1',
  customers: 'customer #1',
};

const updateOrganizationDto = {
  name: 'name update',
  address: 'address update',
  description: 'description update',
  customers: 'customer update',
  new: true,
};

describe('OrganizationsService', () => {
  let service: OrganizationsService;
  let model: Model<OrganizationsProfile>;

  const paginationQueryDto: PaginationQueryDto = {
    limit: 10,
    offset: 1,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationsService,
        {
          provide: getModelToken('Organization'),
          useValue: {
            find: jest.fn().mockReturnValue(organizationsArray),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndRemove: jest.fn(),
            new: jest.fn().mockResolvedValue(mockOrganization),
            constructor: jest.fn().mockResolvedValue(mockOrganization),
            findOne: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
            populate: jest.fn(),
            offset: jest.fn(),
            skip: jest.fn(),
            limit: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<OrganizationsService>(OrganizationsService);
    model = module.get<Model<OrganizationsProfile>>(
      getModelToken('Organization')
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('should return all organizations', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(organizationsArray),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        populate: jest.fn().mockReturnThis(),
      } as any);
      const organizations = await service.findAll(paginationQueryDto);
      expect(organizations).toEqual(organizationsArray);
    });
  });

  describe('findOne()', () => {
    it('should return one organization by id', async () => {
      const findSpy = jest.spyOn(model, 'findById').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockOrganization),
        populate: jest.fn().mockReturnThis(),
      } as any);
      const response = await service.findOne('anyid');
      expect(findSpy).toHaveBeenCalledWith({ _id: 'anyid' });
      expect(response).toEqual(mockOrganization);
    });

    it('should throw an exception if it not find a organization', async () => {
      jest.spyOn(model, 'findById').mockReturnValueOnce({
        exec: jest.fn(() => null),
        populate: jest.fn().mockReturnThis(),
      } as any);
      await expect(service.findOne('anyid')).rejects.toThrow(
        new NotFoundException('Organization #anyid not found')
      );
    });
  });

  describe('create()', () => {
    it('should insert a new organization', async () => {
      jest.spyOn(model, 'create').mockImplementationOnce(
        () =>
          Promise.resolve({
            _id: 'a id',
            name: 'name #1',
            address: 'address #1',
            description: 'description #1',
            customers: 'customer #1',
          }) as any
      );
      const newOrganization = await service.create({
        name: 'name #1',
        address: 'address #1',
        description: 'description #1',
        customers: 'customer #1',
      });
      expect(newOrganization).toEqual({
        _id: 'a id',
        name: 'name #1',
        address: 'address #1',
        description: 'description #1',
        customers: 'customer #1',
      });
    });
  });

  describe('update()', () => {
    it('should update a organization with the correct values by id', async () => {
      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValueOnce({
        _id: 'anyid',
        updateOrganizationDto,
        new: true,
      } as any);

      const updateOrganization = await service.update(
        'anyid',
        updateOrganizationDto
      );
      expect(updateOrganization).toEqual({
        _id: 'anyid',
        updateOrganizationDto,
        new: true,
      });
    });

    it('should throw an exception if it not find a organization', async () => {
      model.findByIdAndUpdate = jest.fn().mockResolvedValueOnce(null);
      await expect(
        service.update('not correct id', updateOrganizationDto)
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove()', () => {
    it('should remove a organization by id', async () => {
      const removeSpy = jest.spyOn(model, 'findByIdAndRemove');
      const retVal = await service.remove('any id');
      expect(removeSpy).toBeCalledWith('any id');
      expect(retVal).toBeUndefined();
    });
  });
});
