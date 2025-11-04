import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DesignCarousel, DesignCarouselSchema } from './design-carousel.schema';
import { DesignCarouselService } from './design-carousel.service';
import { DesignCarouselController } from './design-carousel.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DesignCarousel.name, schema: DesignCarouselSchema },
    ]),
  ],
  controllers: [DesignCarouselController],
  providers: [DesignCarouselService],
  exports: [DesignCarouselService],
})
export class DesignCarouselModule {}
