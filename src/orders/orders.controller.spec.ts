import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ProductsService } from '../products/products.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateProductDto } from '../products/dto/create-product.dto';

describe('OrdersController', () => {
  let controller: OrdersController;
  let ordersService: OrdersService;
  let productsService: ProductsService;

  const dummyUserId = 'user123';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [OrdersService, ProductsService],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    ordersService = module.get<OrdersService>(OrdersService);
    productsService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should place an order via controller', () => {
    const productDto: CreateProductDto = {
      name: 'Controller Test Product',
      priceEth: 0.1,
      category: 'Test',
    };
    const product = productsService.create(productDto);

    const orderDto: CreateOrderDto = {
      productId: product.id,
      quantity: 1,
    };

    const order = controller.placeOrder(orderDto);
    expect(order.userId).toBe(dummyUserId);
    expect(order.totalPriceEth).toBe(0.1);
  });

  it('should get all orders for user', () => {
    const orders = controller.getOrdersForUser();
    expect(Array.isArray(orders)).toBe(true);
  });
});
