import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

const mockCustomer: any = {
  _id: 'anyid',
  firstName: 'firstName#1',
  lastName: 'lastName#1',
  email: 'test@example.it',
  phone: '1234567890',
  address: 'address #1',
  description: 'description #1',
  organizations: 'organization #1',
};

const createCustomerDto: CreateCustomerDto = {
  firstName: 'firstName#1',
  lastName: 'lastName#1',
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

describe('Customers Controller', () => {
  let customersController: CustomersController;
  let customersService: CustomersService;
  const paginationQueryDto: PaginationQueryDto = {
    limit: 10,
    offset: 1,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        {
          provide: CustomersService,
          useValue: {
            create: jest.fn(() => []),
            findAll: jest.fn(() => []),
            findOne: jest.fn(() => mockCustomer),
            update: jest.fn(() => {}),
            remove: jest.fn(() => {}),
          },
        },
      ],
    }).compile();

    customersController = module.get<CustomersController>(CustomersController);
    customersService = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(customersController).toBeDefined();
  });

  describe('getAllCustomer()', () => {
    it('should call method findAll in CustomersService', async () => {
      await customersController.getAllCustomer(paginationQueryDto);
      expect(customersService.findAll).toHaveBeenCalled();
    });
  });

  describe('getCustomer()', () => {
    it('should call method findOne in CustomersService with correct value', async () => {
      const findSpy = jest.spyOn(customersService, 'findOne');
      await customersController.getCustomer('anyid');
      expect(findSpy).toHaveBeenCalledWith('anyid');
    });

    it('should throw an exception if it not found a customer by id', async () => {
      customersService.findOne = jest.fn().mockResolvedValueOnce(null);
      await expect(customersController.getCustomer('anyid')).rejects.toThrow(
        NotFoundException
      );
    });
  });

  describe('addCustomer()', () => {
    it('should call method create in CustomersService with correct values', async () => {
      const createCustomerSpy = jest.spyOn(customersService, 'create');
      await customersController.addCustomer(createCustomerDto);
      expect(createCustomerSpy).toHaveBeenCalledWith(createCustomerDto);
    });

    it('should throw an exception if it not create a user', async () => {
      customersService.create = jest
        .fn()
        .mockRejectedValueOnce(BadRequestException);
      expect(
        customersController.addCustomer({
          firstName: 'not correct firstName',
          lastName: 'not correct lastName',
          email: 'test@example.it',
          phone: 'not correct phone',
          address: 'not correct address',
          description: 'not correct description',
          organizations: 'not correct organization',
        })
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('updateCustomer()', () => {
    it('should call method update in CustomersService with correct values', async () => {
      const updateSpy = jest.spyOn(customersService, 'update');
      await customersController.updateCustomer('anyid', updateCustomerDto);
      expect(updateSpy).toHaveBeenCalledWith('anyid', updateCustomerDto);
    });

    it('should throw an exception if it not update a customer', async () => {
      customersService.update = jest
        .fn()
        .mockRejectedValueOnce(BadRequestException);
      expect(
        customersController.updateCustomer('anyid', {
          firstName: 'not correct firstName',
          lastName: 'not correct lastName',
          email: 'test@example.it',
          phone: 'not correct phone',
          address: 'not correct address',
          description: 'not correct description',
          organizations: 'not correct organization',
        })
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('deleteCustomer()', () => {
    it('should call methoed remove in CustomersService with correct value', async () => {
      const deleteSpy = jest.spyOn(customersService, 'remove');
      await customersController.deleteCustomer('anyid');
      expect(deleteSpy).toHaveBeenCalledWith('anyid');
    });
  });
});
