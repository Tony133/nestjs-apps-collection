import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { CustomersProfile } from './interfaces/customers-profile.interface';
import { Model } from 'mongoose';

const mockCustomer: any = {
  firstName: 'firstName #1',
  lastName: 'lastName #1',
  email: 'test@example.it',
  phone: '1234567890',
  address: 'address #1',
  description: 'description #1',
  organizations: 'organization #1',
};

const customersArray = [
  {
    _id: 'anyid',
    firstName: 'firstName #1',
    lastName: 'lastName #1',
    email: 'test@example.it',
    phone: '1234567890',
    address: 'address #1',
    description: 'description #1',
    organizations: 'organization #1',
  },
  {
    _id: 'anyid',
    firstName: 'firstName #2',
    lastName: 'lastName #2',
    email: 'test@example.it',
    phone: '1234567890',
    address: 'address #2',
    description: 'description #2',
    organizations: 'organization #2',
  },
];

const createCustomerDto: CreateCustomerDto = {
  firstName: 'firstName #1',
  lastName: 'lastName #1',
  email: 'test@example.it',
  phone: '1234567890',
  address: 'address #1',
  description: 'description #1',
  organizations: 'organization #1',
};

const updateCustomerDto: UpdateCustomerDto = {
  firstName: 'firstName update',
  lastName: 'lastName update',
  email: 'test@example.it',
  phone: '1234567890',
  address: 'address update',
  description: 'description update',
  organizations: 'organization update',
};

describe('CustomersService', () => {
  let service: CustomersService;
  let model: Model<CustomersProfile>;

  const paginationQueryDto: PaginationQueryDto = {
    limit: 10,
    offset: 1,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: getModelToken('Customer'),
          useValue: {
            find: jest.fn().mockReturnValue(customersArray),
            findById: jest.fn().mockReturnValue(mockCustomer),
            findByIdAndUpdate: jest.fn().mockReturnValue(updateCustomerDto),
            findByIdAndDelete: jest.fn(),
            new: jest.fn().mockResolvedValue(mockCustomer),
            constructor: jest.fn().mockResolvedValue(mockCustomer),
            create: jest.fn().mockResolvedValue(createCustomerDto),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
            populate: jest.fn(),
            skip: jest.fn(),
            set: jest.fn(),
            offset: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
    model = module.get<Model<CustomersProfile>>(getModelToken('Customer'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('should return all customers', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(customersArray),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        populate: jest.fn().mockReturnThis(),
      } as any);
      const customers = await service.findAll(paginationQueryDto);
      expect(customers).toEqual(customersArray);
    });
  });

  describe('findOne()', () => {
    it('should return one customer', async () => {
      const findSpy = jest.spyOn(model, 'findById').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockCustomer),
        populate: jest.fn().mockReturnThis(),
      } as any);
      const response = await service.findOne('anyid');
      expect(findSpy).toHaveBeenCalledWith({ _id: 'anyid' });
      expect(response).toEqual(mockCustomer);
    });

    it('should throw an exception if it not find a customer', async () => {
      jest.spyOn(model, 'findById').mockReturnValueOnce({
        exec: jest.fn(() => null),
        populate: jest.fn().mockReturnThis(),
      } as any);
      await expect(service.findOne('anyid')).rejects.toThrow(
        new NotFoundException('Customer #anyid not found'),
      );
    });
  });

  describe('create()', () => {
    it('should insert a new customer', async () => {
      jest.spyOn(model, 'create').mockImplementationOnce(
        () =>
          Promise.resolve({
            _id: 'a id',
            firstName: 'firstName #1',
            lastName: 'lastName #1',
            email: 'test@example.it',
            phone: '1234567890',
            address: 'address #1',
            description: 'description #1',
            organizations: 'organization #1',
          }) as any,
      );
      const newCustomer = await service.create({
        firstName: 'firstName #1',
        lastName: 'lastName #1',
        email: 'test@example.it',
        phone: '1234567890',
        address: 'address #1',
        description: 'description #1',
        organizations: 'organization #1',
      });
      expect(newCustomer).toEqual({
        _id: 'a id',
        firstName: 'firstName #1',
        lastName: 'lastName #1',
        email: 'test@example.it',
        phone: '1234567890',
        address: 'address #1',
        description: 'description #1',
        organizations: 'organization #1',
      });
    });
  });

  describe('update()', () => {
    it('should update a customer with the correct values by id', async () => {
      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValueOnce({
        _id: 'anyid',
        updateCustomerDto,
        new: true,
      } as any);

      const updateCustomer = await service.update('anyid', updateCustomerDto);
      expect(updateCustomer).toEqual({
        _id: 'anyid',
        updateCustomerDto,
        new: true,
      });
    });

    it('should throw an exception if it not find a customer', async () => {
      model.findByIdAndUpdate = jest.fn().mockResolvedValueOnce(null);
      await expect(
        service.update('not correct id', updateCustomerDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove()', () => {
    it('should remove a customer by id', async () => {
      const removeSpy = jest.spyOn(model, 'findByIdAndDelete');
      const retVal = await service.remove('any id');
      expect(removeSpy).toHaveBeenCalledWith('any id');
      expect(retVal).toBeUndefined();
    });
  });
});
