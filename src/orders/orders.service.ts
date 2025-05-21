import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrdersService {
  private orders: Order[] = [];
  private idCounter = 1;

  constructor(private readonly productsService: ProductsService) {}

  placeOrder(dto: CreateOrderDto, userId: string): Order {
    const product = this.productsService.findById(dto.productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const order: Order = {
      id: this.idCounter++,
      userId,
      productId: product.id,
      quantity: dto.quantity,
      timestamp: new Date(),
      totalPriceEth: product.priceEth * dto.quantity,
    };

    this.orders.push(order);
    return order;
  }

  getOrdersByUser(userId: string): Order[] {
    return this.orders.filter(order => order.userId === userId);
  }
}
