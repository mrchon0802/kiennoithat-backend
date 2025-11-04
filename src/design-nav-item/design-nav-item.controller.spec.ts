import { Test, TestingModule } from '@nestjs/testing';
import { DesignNavItemController } from './design-nav-item.controller';

describe('DesignNavItemController', () => {
  let controller: DesignNavItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DesignNavItemController],
    }).compile();

    controller = module.get<DesignNavItemController>(DesignNavItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
