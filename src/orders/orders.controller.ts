import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  private readonly dummyUserId = 'user123';

  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  placeOrder(@Body() dto: CreateOrderDto) {
    return this.ordersService.placeOrder(dto, this.dummyUserId);
  }

  @Get()
  getOrdersForUser() {
    return this.ordersService.getOrdersByUser(this.dummyUserId);
  }
}
