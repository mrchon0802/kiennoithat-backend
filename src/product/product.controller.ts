import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.schema';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product | null> {
    return this.productService.findOne(id);
  }
  @Get(':id/image')
  async getImage(@Param('id') id: string): Promise<{ image: string }> {
    const product = await this.productService.findOne(id);
    return { image: product?.image || '' };
  }
  @Post()
  async create(@Body() data: Partial<Product>): Promise<Product> {
    return this.productService.create(data);
  }

  @Post('bulk')
  async createMany(@Body() data: Partial<Product>[]): Promise<Product[]> {
    return this.productService.createMany(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Product>,
  ): Promise<Product | null> {
    return this.productService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Product | null> {
    return this.productService.remove(id);
  }
}
