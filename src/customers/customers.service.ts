import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ICustomer } from './interfaces/customer.interface';
import { CreateCustomerDto, UpdateCustomerDto } from './dto';
import { Customer } from './schemas/customer.schema';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer>,
  ) {}

  public async findAll(paginationQuery: PaginationQueryDto): Promise<Customer[]> {
    const { limit, offset } = paginationQuery;

    return await this.customerModel
      .find()
      .skip(offset)
      .limit(limit)
      .populate('organizations')
      .exec();
  }

  public async findOne(customerID: string): Promise<Customer> {
    const customer = await this.customerModel
      .findById(customerID)
      .populate('Organization')
      .exec();

    if (!customer) {
      throw new NotFoundException(`Customer #${customerID} not found`);
    }

    return customer;
  }

  public async create(
    createCustomerDTO: CreateCustomerDto,
  ): Promise<ICustomer> {
    const newCustomer = await new this.customerModel(createCustomerDTO);
    return newCustomer.save();
  }

  public async update(
    customerID: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<ICustomer> {
    const updatedCustomer = await this.customerModel.findByIdAndUpdate(
      customerID,
      updateCustomerDto,
    );
    return updatedCustomer;
  }

  public async remove(customerID: string): Promise<any> {
    const deletedCustomer = await this.customerModel.findByIdAndRemove(
      customerID,
    );
    return deletedCustomer;
  }
}
