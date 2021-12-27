import { Test, TestingModule } from '@nestjs/testing';
import { RaveResolver } from './rave.resolver';
import { RaveService } from './rave.service';

describe('RaveResolver', () => {
  let resolver: RaveResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RaveResolver, RaveService],
    }).compile();

    resolver = module.get<RaveResolver>(RaveResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
