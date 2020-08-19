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

@Controller('api/customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  public async getAllCustomer(@Res() res, @Query() paginationQuery: PaginationQueryDto) {
    const customers = await this.customersService.findAll(paginationQuery);
    return res.status(HttpStatus.OK).json(customers);
  }

  @Get('/:id')
  public async getCustomer(@Res() res, @Param('id') customerID: string) {
    const customer = await this.customersService.findOne(customerID);
    if (!customer) {
      throw new NotFoundException('Customer does not exist!');
    }
    return res.status(HttpStatus.OK).json(customer);
  }

  @Post()
  public async addCustomer(
    @Res() res,
    @Body() createCustomerDTO: CreateCustomerDto,
  ) {
    try {
      const customer = await this.customersService.create(createCustomerDTO);
      return res.status(HttpStatus.OK).json({
        message: 'Customer has been created successfully',
        customer,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Customer not created!',
        status: 400,
      });
    }
  }

  @Put('/:id')
  public async updateCustomer(
    @Res() res,
    @Param('id') customerID: string,
    @Body() updateCustomerDTO: UpdateCustomerDto,
  ) {
    try {
      const customer = await this.customersService.update(
        customerID,
        updateCustomerDTO,
      );
      if (!customer) {
        throw new NotFoundException('Customer does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Customer has been successfully updated',
        customer,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Customer not updated!',
        status: 400,
      });
    }
  }

  @Delete('/:id')
  public async deleteCustomer(@Res() res, @Param('id') customerID: string) {
    if (!customerID) {
      throw new NotFoundException('Customer ID does not exist');
    }

    const customer = await this.customersService.remove(customerID);

    if (!customer) {
      throw new NotFoundException('Customer does not exist');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Customer has been deleted',
      customer,
    });
  }
}
