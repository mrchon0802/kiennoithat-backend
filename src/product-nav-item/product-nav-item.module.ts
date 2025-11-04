import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductNavItemService } from './product-nav-item.service';
import { ProductNavItemController } from './product-nav-item.controller';
import {
  ProductNavItem,
  ProductNavItemSchema,
} from './product-nav-item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductNavItem.name, schema: ProductNavItemSchema },
    ]),
  ],
  controllers: [ProductNavItemController],
  providers: [ProductNavItemService],
  exports: [ProductNavItemService],
})
export class ProductNavItemModule {}

