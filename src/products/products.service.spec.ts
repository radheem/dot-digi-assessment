import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', () => {
    const dto: CreateProductDto = {
      name: 'Test Product',
      priceEth: 0.05,
      category: 'Test',
    };
    const product = service.create(dto);
    expect(product).toHaveProperty('id');
    expect(product.name).toBe(dto.name);
  });

  it('should find product by ID', () => {
    const dto: CreateProductDto = {
      name: 'Test Product 2',
      priceEth: 0.1,
      category: 'TestCat',
    };
    const product = service.create(dto);
    const found = service.findById(product.id);
    expect(found).toEqual(product);
  });
});
