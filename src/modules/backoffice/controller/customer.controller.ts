import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { Customer } from '../models/customer.model';
import { Result } from '../models/result.model';
import { ValidatorInterceptor } from '../../../interceptors/validator.interceptor';
import { CreateCustomerContract } from '../contracts/customer/create-customer.contract';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { AccountService } from '../services/account.service';
import { User } from '../models/user.model';
import { CustomerService } from '../services/customer.service';
import { QueryDto } from '../dtos/query.dto';
import { UpdateCustomerDto } from '../dtos/update-customer.dto';
import { UpdateCustomerContract } from '../contracts/customer/update-customer.contract';
import { CreateCreditCardContract } from '../contracts/customer/create-credit-card.contract';
import { CreditCard } from '../models/credit-card.model';

@Controller(`/v1/customers`)
export class CustomerController {
  constructor(
    private readonly accountService: AccountService,
    private readonly customerService: CustomerService,
  ) {}

  @Get()
  async getAll() {
    try {
      const customers = await this.customerService.findAll();
      return new Result(null, true, customers, null);
    } catch (error) {
      throw new HttpException(
        new Result(`Não foi possivel listar os customers`, false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':document')
  async getById(@Param('document') document) {
    try {
      const customer = await this.customerService.find(document);
      return new Result(null, true, customer, null);
    } catch (error) {
      throw new HttpException(
        new Result(`Não foi possivel listar os customers`, false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('query')
  async query(@Body() model: QueryDto) {
    try {
      const customers = await this.customerService.query(model);
      return new Result(null, true, customers, null);
    } catch (error) {
      throw new HttpException(
        new Result(`Não foi executar a query`, false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
  async post(@Body() model: CreateCustomerDto) {
    let user;
    let customer;
    try {
      user = await this.accountService.create(
        new User(model.document, model.password, true),
      );
      customer = await this.customerService.create(
        new Customer(
          model.name,
          model.document,
          model.email,
          null,
          null,
          null,
          null,
          user,
        ),
      );

      return new Result(`Cliente criado com sucesso`, true, customer, null);
    } catch (error) {
      throw new HttpException(
        new Result(`Cliente não pode ser criado`, false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(`:document`)
  @UseInterceptors(new ValidatorInterceptor(new UpdateCustomerContract()))
  async put(
    @Param('document') document: string,
    @Body() body: UpdateCustomerDto,
  ) {
    try {
      const customer = await this.customerService.update(document, body);
      return new Result(`Cliente atualizado com sucesso`, true, customer, null);
    } catch (error) {
      throw new HttpException(
        new Result(`Não foi possível atualizar o cliente`, false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(`:document`)
  delete(@Param(`document`) document: string) {
    return new Result(`Cliente removido com sucesso`, true, null, null);
  }

  @Post(`:document/credit-cards`)
  @UseInterceptors(new ValidatorInterceptor(new CreateCreditCardContract()))
  async createCreditCard(
    @Param('document') document: string,
    @Body() model: CreditCard,
  ) {
    try {
      await this.customerService.saveOrUpdateCreditCard(document, model);
      return new Result(
        `Cartão de crédito registrado com sucesso.`,
        true,
        model,
        null,
      );
    } catch (error) {
      throw new HttpException(
        new Result(
          `Não foi possível inserir o cartão de crédito`,
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
