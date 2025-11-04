import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { BannerService } from './banner.service';
import { Banner } from './banner.schema';

@Controller('banners') // => API endpoint = /banners
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Get()
  async findAll(): Promise<Banner[]> {
    return this.bannerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Banner | null> {
    return this.bannerService.findOne(id);
  }

  @Post()
  async create(@Body() data: Partial<Banner>): Promise<Banner> {
    return this.bannerService.create(data);
  }
}
