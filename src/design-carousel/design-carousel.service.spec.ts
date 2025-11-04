import { Test, TestingModule } from '@nestjs/testing';
import { DesignCarouselService } from './design-carousel.service';

describe('DesignCarouselService', () => {
  let service: DesignCarouselService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DesignCarouselService],
    }).compile();

    service = module.get<DesignCarouselService>(DesignCarouselService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
