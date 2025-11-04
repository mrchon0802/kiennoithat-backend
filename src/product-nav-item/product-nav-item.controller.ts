import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductNavItemService } from './product-nav-item.service';
import { ProductNavItem } from './product-nav-item.schema';

@Controller('product-nav-items')
export class ProductNavItemController {
  constructor(private readonly productNavItemService: ProductNavItemService) {}

  @Get()
  async findAll(): Promise<ProductNavItem[]> {
    return this.productNavItemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductNavItem | null> {
    return this.productNavItemService.findOne(id);
  }

  @Post()
  async create(@Body() data: Partial<ProductNavItem>): Promise<ProductNavItem> {
    return this.productNavItemService.create(data);
  }

  @Post('many')
  async createMany(
    @Body() data: Partial<ProductNavItem>[],
  ): Promise<ProductNavItem[]> {
    return this.productNavItemService.createMany(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<ProductNavItem>,
  ): Promise<ProductNavItem | null> {
    return this.productNavItemService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ProductNavItem | null> {
    return this.productNavItemService.remove(id);
  }
}
