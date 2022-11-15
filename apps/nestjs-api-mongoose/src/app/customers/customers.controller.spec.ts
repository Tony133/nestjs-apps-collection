import {
  BadRequestException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

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

  const response = new MockResponse();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        {
          provide: CustomersService,
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

    customersController = module.get<CustomersController>(CustomersController);
    customersService = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(customersController).toBeDefined();
  });

  describe('getAllCustomer()', () => {
    it('should call method findAll in CustomersService', async () => {
      await customersController.getAllCustomer(response, paginationQueryDto);
      expect(customersService.findAll).toHaveBeenCalled();
    });

    it('should throw if CustomersService findAll throws', async () => {
      jest
        .spyOn(customersService, 'findAll')
        .mockRejectedValueOnce(new NotFoundException());
      await expect(
        customersController.getAllCustomer(response, paginationQueryDto),
      ).rejects.toThrow(new NotFoundException());
    });

    it('should return customer on success', async () => {
      await customersController.getAllCustomer(response, paginationQueryDto);
      expect(customersService.findAll).toHaveBeenCalled();
    });
  });

  describe('getCustomer()', () => {
    it('should call method findOne in CustomersService with correct value', async () => {
      const findSpy = jest.spyOn(customersService, 'findOne');
      await customersController.getCustomer(response, 'anyid');
      expect(findSpy).toHaveBeenCalledWith('anyid');
    });

    it('should throw if CustomersService findOne throws', async () => {
      jest
        .spyOn(customersService, 'findOne')
        .mockRejectedValueOnce(new NotFoundException());
      await expect(
        customersController.getCustomer(response, 'anyid'),
      ).rejects.toThrow(new NotFoundException());
    });

    it('should return a customer on success', async () => {
      jest
        .spyOn(customersService, 'findOne')
        .mockResolvedValueOnce(mockCustomer);
      await customersController.getCustomer(response, 'anyid');
      expect(customersService.findOne).toHaveBeenCalled();
    });
  });

  describe('addCustomer()', () => {
    it('should call method create in CustomersService with correct values', async () => {
      const createSpy = jest.spyOn(customersService, 'create');
      await customersController.addCustomer(response, createCustomerDto);
      expect(createSpy).toHaveBeenCalledWith(createCustomerDto);
    });

    it('should return a customer on success', async () => {
      const createCustomerSpy = jest.spyOn(customersService, 'create');
      await customersController.addCustomer(response, createCustomerDto);
      expect(createCustomerSpy).toHaveBeenCalledWith(createCustomerDto);
    });
  });

  describe('updateCustomer()', () => {
    it('should call method update in CustomersService with correct values', async () => {
      const updateSpy = jest.spyOn(customersService, 'update');
      await customersController.updateCustomer(
        response,
        'anyid',
        updateCustomerDto,
      );
      expect(updateSpy).toHaveBeenCalledWith('anyid', updateCustomerDto);
    });
  });

  describe('deleteCustomer()', () => {
    it('should call methoed remove in CustomersService with correct value', async () => {
      const deleteSpy = jest.spyOn(customersService, 'remove');
      await customersController.deleteCustomer(response, 'anyid');
      expect(deleteSpy).toHaveBeenCalledWith('anyid');
    });

    it('should throw error if id in CustomersService not exists', async () => {
      jest
        .spyOn(customersService, 'remove')
        .mockRejectedValueOnce(new NotFoundException());
      await expect(
        customersController.deleteCustomer(response, 'anyid'),
      ).rejects.toThrow(new NotFoundException());
    });
  });
});
