import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { DesignCarouselService } from './design-carousel.service';
import { DesignCarousel } from './design-carousel.schema';

@Controller('design-carousel')
export class DesignCarouselController {
  constructor(private readonly designCarouselService: DesignCarouselService) {}

  @Get()
  async findAll(): Promise<DesignCarousel[]> {
    return this.designCarouselService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DesignCarousel | null> {
    return this.designCarouselService.findOne(id);
  }

  @Post()
  async create(@Body() data: Partial<DesignCarousel>): Promise<DesignCarousel> {
    return this.designCarouselService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<DesignCarousel>,
  ): Promise<DesignCarousel | null> {
    return this.designCarouselService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DesignCarousel | null> {
    return this.designCarouselService.delete(id);
  }
}
