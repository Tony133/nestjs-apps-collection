import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CustomersProfile } from './interfaces/customers-profile.interface';
import { CreateCustomerDto, UpdateCustomerDto } from './dto';
import { Customer } from './schemas/customer.schema';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer>,
  ) {}

  public async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<Customer[]> {
    const { limit, offset } = paginationQuery;

    return await this.customerModel
      .find()
      .skip(offset)
      .limit(limit)
      .populate({
        path: 'organizations',
        select: 'organization',
        options: { strict: false },
      })
      .exec();
  }

  public async findOne(customerId: string): Promise<Customer> {
    const customer = await this.customerModel
      .findById({ _id: customerId })
      .populate({
        path: 'organizations',
        select: 'organization',
        options: { strict: false },
      })
      .exec();

    if (!customer) {
      throw new NotFoundException(`Customer #${customerId} not found`);
    }

    return customer;
  }

  public async create(
    createCustomerDto: CreateCustomerDto,
  ): Promise<CustomersProfile> {
    const newCustomer = await this.customerModel.create(createCustomerDto);
    return newCustomer;
  }

  public async update(
    customerId: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<CustomersProfile> {
    const existingCustomer = await this.customerModel.findByIdAndUpdate(
      { _id: customerId },
      updateCustomerDto,
    );

    if (!existingCustomer) {
      throw new NotFoundException(`Customer #${customerId} not found`);
    }

    return existingCustomer;
  }

  public async remove(customerId: string): Promise<any> {
    const deletedCustomer =
      await this.customerModel.findByIdAndDelete(customerId);
    return deletedCustomer;
  }
}
