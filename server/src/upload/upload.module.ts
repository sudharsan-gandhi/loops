import { Module } from '@nestjs/common';

import { AudioStorageService } from './services/audio-storage.service';
import { StorageEngineService } from './services/storage-engine.service';
import { UserPhotoController } from './user-photo/user-photo.controller';
import { AddAudioController } from './add-audio/add-audio.controller';

@Module({
  controllers: [UserPhotoController, AddAudioController],
  providers: [
    {
      provide: 'OPTIONS',
      useValue: {
        bucket: './static/avatars',
      },
    },
    {
      provide: 'AVATAR_OPTIONS',
      useValue: {
        bucket: './static/packs',
      },
    },
    StorageEngineService,
    AudioStorageService
  ],
  exports: [StorageEngineService, AudioStorageService]
})
export class UploadModule {}
