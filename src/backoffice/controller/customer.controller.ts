import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { Customer } from '../models/customer.model';
import { Result } from '../models/result.model';
import { ValidatorInterceptor } from '../../interceptors/validator.interceptor';
import { CreateCustomerContract } from '../contracts/create-customer.contract';
import { CreateCustomerDto } from '../dtos/create-customer-dto';
import { AccountService } from '../service/account.service';
import { User } from '../models/user.model';
import { CustomerService } from '../service/customer.service';

@Controller(`/v1/customers`)
export class CustomerController {

  constructor(
    private readonly accountService: AccountService,
    private readonly customerService: CustomerService) {
  }

  @Get()
  get() {
    return new Result(null, true, [], null);
  }

  @Get(':document')
  getById(@Param('document') document: string) {
    return new Result(null, true, {}, null);
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
      throw new HttpException(new Result(`Cliente não pode ser criado`, false, null, error), HttpStatus.BAD_REQUEST)
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
