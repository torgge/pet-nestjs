import {
    Controller,
    HttpException,
    HttpStatus,
    Get,
    Post,
    Body,
    Param,
  } from '@nestjs/common';
  import { Result } from '../../backoffice/models/result.model';
  import { Order } from '../entities/order.entity';
  import { OrderItemDto } from '../dtos/order-item.dto';
  import { OrderService } from '../services/order.service';
  import { OrderItemService } from '../services/order-item.service';
  import { ProductService } from '../services/product.service';
  import { OrderItem } from '../entities/order-item.entity';
  
  @Controller('v1/orders')
  export class OrderController {
    constructor(
      private readonly orderService: OrderService,
      private readonly orderItemService: OrderItemService,
      private readonly productService: ProductService,
    ) {}
  
    @Get(':order')
    async get(@Param('order') order: string) {
      try {
        const orders = await this.orderService.getByNumber(order);
        return new Result(null, true, orders, null);
      } catch (error) {
        throw new HttpException(
          new Result('Não foi possível listar os pedidos', false, null, error),
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  
    @Get(':customer')
    async getByCustomer(@Param('customer') customer: string) {
      try {
        const orders = await this.orderService.getByNumber(customer);
        return new Result(null, true, orders, null);
      } catch (error) {
        throw new HttpException(
          new Result('Não foi possível listar os pedidos', false, null, error),
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  
    @Post()
    async post(@Body() model: OrderItemDto[]) {
      try {
        const order = new Order();
        order.customer = '12345678911';
        order.date = new Date();
        order.number = '1B2D3F5';
        order.items = [];
        await this.orderService.post(order);
  
        for (const item of model) {
          const product = await this.productService.getById(item.product);
          const orderItem = new OrderItem();
          orderItem.order = order;
          orderItem.product = product;
          orderItem.price = product.price;
          orderItem.quantity = item.quantity;
  
          await this.orderItemService.post(orderItem);
        }
  
        return new Result(null, true, model, null);
      } catch (error) {
        throw new HttpException(
          new Result('Não foi possível incluir o produto', false, null, error),
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }