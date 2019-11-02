import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from '../models/customer.model';

export class CustomerService {
  constructor(
    @InjectModel('Customer')
    private readonly model: Model<Customer>) {
  }

  async create(data: Customer): Promise<Customer> {
    const customer = this.model(data);
    return customer.save();
  }
}
