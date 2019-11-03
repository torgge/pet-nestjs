import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from '../models/customer.model';
import { Address } from '../models/address.model';
import { Pet } from '../models/pet.model';
import { QueryDto } from '../dtos/query.dto';

export class CustomerService {
  constructor(
    @InjectModel('Customer')
    private readonly model: Model<Customer>) {
  }

  async create(data: Customer): Promise<Customer> {
    const customer = this.model(data);
    return customer.save();
  }

  async addBillingAddress(document: string, data: Address): Promise<Customer> {
    // se buscar e não existir ele cria, senão atualia;
    const options = { upsite: true };
    return await this.model.findOneAndUpdate({ document }, {
      $set: {
        billingAddress: data,
      },
    }, options);
  }

  async addShippingAddress(document: string, data: Address): Promise<Customer> {
    // se buscar e não existir ele cria, senão atualia;
    const options = { upsite: true };
    return await this.model.findOneAndUpdate({ document }, {
      $set: {
        shippingAddress: data,
      },
    }, options);
  }

  async createPet(document: string, data: Pet): Promise<Customer> {
    // se buscar e não existir ele cria, senão atualia e atribui um novo id;
    const options = { upsite: true, new: true };
    return await this.model.findOneAndUpdate({ document }, {
      $push: {
        pets: data,
      },
    }, options);
  }

  async updatePet(document: string, id: string, data: Pet): Promise<Customer> {
    const options = { useFindAndModify: false };
    return await this.model.findOneAndUpdate({ document, 'pets._id': id },
      {
        $set: {
          'pets.$': data,
        },
      }, options);
  }

  async findAll(): Promise<Customer[]> {
    // utilie "-" para oprimir campos
    return await this.model
        .find({}, '-_id name email document')
        .sort('name');
  }

  async find(document: string): Promise<Customer> {
    // populate limita os campos do obj user
    return await this.model
      .find({ document })
      .populate('user',  'username');
  }

  async query(model: QueryDto): Promise<Customer[]> {
    return await this.model
      .find(model.query,
            model.fields,
            {
              skip: model.skip,
              limit: model.take
            })
      .sort(model.sort);
  }
}
