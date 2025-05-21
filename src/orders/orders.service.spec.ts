import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { ProductsService } from '../products/products.service';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { CreateOrderDto } from './dto/create-order.dto';

describe('OrdersService', () => {
  let service: OrdersService;
  let productsService: ProductsService;
  const dummyUserId = 'user123';
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersService, ProductsService],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    productsService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should place an order', () => {
    const productDto: CreateProductDto = {
      name: 'Orderable Product',
      priceEth: 0.05,
      category: 'Cat',
    };
    const product = productsService.create(productDto);

    const orderDto: CreateOrderDto = {
      productId: product.id,
      quantity: 2,
    };

    const order = service.placeOrder(orderDto, dummyUserId);
    expect(order).toHaveProperty('id');
    expect(order.totalPriceEth).toBe(0.1);
  });

  it('should return user orders', () => {
    const orders = service.getOrdersByUser(dummyUserId);
    expect(Array.isArray(orders)).toBe(true);
  });
});
