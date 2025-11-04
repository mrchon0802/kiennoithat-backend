import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DesignNavItemService } from './design-nav-item.service';
import { DesignNavItemController } from './design-nav-item.controller';
import { DesignNavItem, DesignNavItemSchema } from './design-nav-item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DesignNavItem.name, schema: DesignNavItemSchema },
    ]),
  ],
  controllers: [DesignNavItemController],
  providers: [DesignNavItemService],
  exports: [DesignNavItemService],
})
export class DesignNavItemModule {}
