import { Test, TestingModule } from '@nestjs/testing';
import { PacksResolver } from './packs.resolver';
import { PacksService } from './packs.service';

describe('PacksResolver', () => {
  let resolver: PacksResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PacksResolver, PacksService],
    }).compile();

    resolver = module.get<PacksResolver>(PacksResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
