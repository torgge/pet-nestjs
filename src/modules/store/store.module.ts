import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../store/entities/product.entity';
import { ProductService } from '../store/services/product.service';
import { ProductController } from '../store/controllers/product.controller';
import { Order } from '../store/entities/order.entity';
import { OrderItem } from '../store/entities/order-item.entity';
import { OrderService } from '../store/services/order.service';
import { OrderController } from '../store/controllers/order.controller';
import { OrderItemService } from './services/order-item.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Order, OrderItem])],
  providers: [ProductService, OrderService, OrderItemService],
  controllers: [ProductController, OrderController],
})
export class StoreModule {}
