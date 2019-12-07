import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Customer } from '../models/customer.model';
import { QueryDto } from '../dtos/query.dto';
import { UpdateCustomerDto } from '../dtos/customer/update-customer.dto';
import { CreditCard } from '../models/credit-card.model';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer')
    private readonly model: Model<Customer>,
  ) {}

  async create(data: Customer): Promise<Customer> {
    const customer = this.model(data);
    return customer.save();
  }

  async findAll(): Promise<Customer[]> {
    // utilie "-" para oprimir campos
    return await this.model.find({}, '-_id name email document').sort('name');
  }

  async find(document: string): Promise<Customer> {
    // populate limita os campos do obj user
    return await this.model.find({ document }).populate('user', 'username');
  }

  async query(model: QueryDto): Promise<Customer[]> {
    return await this.model
      .find(model.query, model.fields, {
        skip: model.skip,
        limit: model.take,
      })
      .sort(model.sort);
  }

  async update(document: string, data: UpdateCustomerDto): Promise<Customer> {
    return await this.model.findOneAndUpdate({ document }, data);
  }

  async saveOrUpdateCreditCard(
    document: string,
    data: CreditCard,
  ): Promise<Customer> {
    const options = { upsert: true };
    return await this.model.findOneAndUpdate(
      { document },
      {
        $Set: {
          card: data,
        },
      },
    );
  }
}
