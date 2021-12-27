import { Test, TestingModule } from '@nestjs/testing';
import { AudiosResolver } from './audios.resolver';
import { AudiosService } from './audios.service';

describe('AudiosResolver', () => {
  let resolver: AudiosResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AudiosResolver, AudiosService],
    }).compile();

    resolver = module.get<AudiosResolver>(AudiosResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
