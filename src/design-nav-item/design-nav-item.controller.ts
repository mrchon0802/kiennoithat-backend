import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { DesignNavItemService } from './design-nav-item.service';
import { DesignNavItem } from './design-nav-item.schema';

@Controller('design-nav-items')
export class DesignNavItemController {
  constructor(private readonly designNavItemService: DesignNavItemService) {}

  // Lấy tất cả nav items
  @Get()
  async findAll(): Promise<DesignNavItem[]> {
    return this.designNavItemService.findAll();
  }

  // Lấy 1 nav item theo id
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DesignNavItem | null> {
    return this.designNavItemService.findOne(id);
  }

  // Tạo 1 nav item
  @Post()
  async create(@Body() data: Partial<DesignNavItem>): Promise<DesignNavItem> {
    return this.designNavItemService.create(data);
  }

  // Tạo nhiều nav items (nếu muốn import bulk)
  @Post('bulk')
  async createMany(
    @Body() data: Partial<DesignNavItem>[],
  ): Promise<DesignNavItem[]> {
    const results: DesignNavItem[] = [];
    for (const item of data) {
      const created = await this.designNavItemService.create(item);
      results.push(created);
    }
    return results;
  }

  // Cập nhật 1 nav item theo id
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<DesignNavItem>,
  ): Promise<DesignNavItem | null> {
    return this.designNavItemService.update(id, data);
  }

  // Xoá 1 nav item theo id
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DesignNavItem | null> {
    return this.designNavItemService.remove(id);
  }
}
