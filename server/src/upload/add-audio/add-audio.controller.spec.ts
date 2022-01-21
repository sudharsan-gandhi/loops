import { Test, TestingModule } from '@nestjs/testing';
import { AddAudioController } from './add-audio.controller';

describe('AddAudioController', () => {
  let controller: AddAudioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddAudioController],
    }).compile();

    controller = module.get<AddAudioController>(AddAudioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
