import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  NotFoundException,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ApiTags } from '@nestjs/swagger';
import { BadRequestException } from '@nestjs/common';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  public async getAllCustomer(@Query() paginationQuery: PaginationQueryDto) {
    return await this.customersService.findAll(paginationQuery);
  }

  @Get('/:id')
  public async getCustomer(@Param('id') customerId: string) {
    const customer = await this.customersService.findOne(customerId);
    if (!customer) {
      throw new NotFoundException('Customer ID does not exist');
    }

    return customer;
  }

  @Post()
  public async addCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    try {
      return await this.customersService.create(createCustomerDto);
    } catch (err) {
      throw new BadRequestException(err, 'Error: Customer not created!');
    }
  }

  @Put('/:id')
  public async updateCustomer(
    @Param('id') customerId: string,
    @Body() updateCustomerDto: UpdateCustomerDto
  ) {
    try {
      const customer = await this.customersService.update(
        customerId,
        updateCustomerDto
      );
      return {
        message: 'Customer has been successfully updated',
        customer,
      };
    } catch (err) {
      throw new BadRequestException(err, 'Error: Customer not updated!');
    }
  }

  @Delete('/:id')
  public async deleteCustomer(@Param('id') customerId: string) {
    if (!customerId) {
      throw new NotFoundException('Customer ID does not exist');
    }

    const customer = await this.customersService.remove(customerId);
    return {
      message: 'Customer has been deleted',
      customer,
    };
  }
}
