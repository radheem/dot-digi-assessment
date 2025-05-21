import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';


@Injectable()
export class ProductsService {
  private products: Product[] = [];
  private idCounter = 1;

  create(dto: CreateProductDto): Product {
    const newProduct: Product = {
      id: this.idCounter++,
      ...dto,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  findById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }
}
