import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Customer } from './schemas/customer.schema';
import { CustomerResponse } from './dto/customer.response';
import { retry } from 'rxjs';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name)
    private customerModel: mongoose.Model<Customer>,
  ) { }

  async createCustomer(customer: Customer): Promise<Customer> {
    return await this.customerModel.create(customer);
  }

  async findCustomerById(
    id: string,
    api_key: string,
  ): Promise<CustomerResponse> {
    const customer = await this.customerModel.findById(id, [
      'first_name',
      'balance',
    ]);
    if (!customer) {
      throw new Error('Customer not found.');
    }
    const response_customer: CustomerResponse = {
      first_name: customer.first_name,
    };
    if (api_key) {
      response_customer.balance = customer.balance;
    }
    return response_customer;
  }

  async updateById(id: string, customer: Customer): Promise<Customer> {
    let update_customer = this.customerModel.findByIdAndUpdate(id, customer, {
      new: true,
      runValidators: true,
    });
    if (!update_customer) {
      throw new Error('Customer not found.');
    }
    return update_customer

  }

  async deleteById(id: string): Promise<Customer> {
    let customer = await this.customerModel.findByIdAndDelete(id);
    if (!customer) {
      throw new Error('Customer not found.');
    }
    return customer
  }
}
