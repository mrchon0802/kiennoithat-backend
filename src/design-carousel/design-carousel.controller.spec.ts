import { Test, TestingModule } from '@nestjs/testing';
import { DesignCarouselController } from './design-carousel.controller';

describe('DesignCarouselController', () => {
  let controller: DesignCarouselController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DesignCarouselController],
    }).compile();

    controller = module.get<DesignCarouselController>(DesignCarouselController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
