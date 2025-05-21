import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ProductsModule } from 'src/products/products.module';
import { ProductsService } from 'src/products/products.service';

@Module({
  imports: [ProductsModule, ProductsService],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
