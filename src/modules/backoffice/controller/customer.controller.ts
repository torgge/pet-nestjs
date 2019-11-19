import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { Customer } from '../models/customer.model';
import { Result } from '../models/result.model';
import { ValidatorInterceptor } from '../../../interceptors/validator.interceptor';
import { CreateCustomerContract } from '../contracts/customer/create-customer.contract';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { AccountService } from '../services/account.service';
import { User } from '../models/user.model';
import { CustomerService } from '../services/customer.service';
import { Pet } from '../models/pet.model';
import { CreatePetContract } from '../contracts/pet/create-pet.contract';
import { QueryDto } from '../dtos/query.dto';
import { PetService } from '../services/pet.service';

@Controller(`/v1/customers`)
export class CustomerController {

  constructor(
    private readonly accountService: AccountService,
    private readonly customerService: CustomerService) {
  }

  @Get()
  async getAll() {
    try {
      const customers = await this.customerService.findAll();
      return new Result(null, true, customers, null);
    } catch (error) {
      throw new HttpException(new Result(`Não foi possivel listar os customers`, false, null, error), HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':document')
  async getById(
    @Param('document') document,
  ) {
    try {
      const customer = await this.customerService.find(document);
      return new Result(null, true, customer, null);
    } catch (error) {
      throw new HttpException(new Result(`Não foi possivel listar os customers`, false, null, error), HttpStatus.BAD_REQUEST);
    }
  }

  @Post('query')
  async query(
    @Body() model: QueryDto,
  ) {
    try {
      const customers = await this.customerService.query(model);
      return new Result(null, true, customers, null);
    } catch (error) {
      throw new HttpException(new Result(`Não foi executar a query`, false, null, error), HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
  async post(@Body() model: CreateCustomerDto) {
    let user;
    let customer;
    try {
      user = await this.accountService.create(new User(model.document, model.password, true));
      customer = await this.customerService.create(new Customer(model.name, model.document, model.email, null, null, null, null, user));

      return new Result(`Cliente criado com sucesso`, true, customer, null);
    } catch (error) {
      throw new HttpException(new Result(`Cliente não pode ser criado`, false, null, error), HttpStatus.BAD_REQUEST);
    }
  }

  @Put(`:document`)
  put(@Param('document') document: string, @Body() body: Customer) {
    return new Result(`Cliente alterado com sucesso`, true, body, null);
  }

  @Delete(`:document`)
  delete(@Param(`document`) document: string) {
    return new Result(`Cliente removido com sucesso`, true, null, null);
  }
}
