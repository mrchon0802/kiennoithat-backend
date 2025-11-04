import { Test, TestingModule } from '@nestjs/testing';
import { DesignNavItemService } from './design-nav-item.service';

describe('DesignNavItemService', () => {
  let service: DesignNavItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DesignNavItemService],
    }).compile();

    service = module.get<DesignNavItemService>(DesignNavItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
