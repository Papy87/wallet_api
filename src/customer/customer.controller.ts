import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Headers,
  UseGuards,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerRequest } from './dto/customer_create.request';
import { UpdateCustomerRequest } from './dto/customer_update.request';
import { CustomerResponse } from './dto/customer.response';
import { Customer } from './schemas/customer.schema';
import { ApiKeyAuthGuard } from 'src/auth/guard/apikey_auth,guars';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) { }

  @Post()
  @UseGuards(ApiKeyAuthGuard)
  async createCustomer(
    @Body()
    customer: CreateCustomerRequest,
  ): Promise<Customer> {
    try {
      return this.customerService.createCustomer(customer);
    } catch (e) {
      throw new BadRequestException();
    }
  }

  @Get(':id')
  async getCustomer(
    @Headers()
    header: any,
    @Param('id')
    id: string,
  ): Promise<CustomerResponse> {
    try {
      const api_key = header['api-key'];
      return this.customerService.findCustomerById(id, api_key);
    } catch (e) {
      throw new NotFoundException();
    }
  }

  @Patch(':id')
  @UseGuards(ApiKeyAuthGuard)
  async updateBook(
    @Param('id')
    id: string,
    @Body()
    customer: UpdateCustomerRequest,
  ): Promise<Customer> {
    try {
      return this.customerService.updateById(id, customer);
    } catch (e) {
      throw new BadRequestException();
    }
  }

  @Delete(':id')
  @UseGuards(ApiKeyAuthGuard)
  async deleteCustomer(
    @Param('id')
    id: string,
  ): Promise<Customer> {
    try {
      return this.customerService.deleteById(id);
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
