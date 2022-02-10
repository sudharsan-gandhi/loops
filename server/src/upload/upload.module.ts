import {
  existsSync,
  mkdirSync,
} from 'fs';
import { join } from 'path';

import { Module } from '@nestjs/common';

import { AddAudioController } from './add-audio/add-audio.controller';
import { AudioStorageService } from './services/audio-storage.service';
import { StorageEngineService } from './services/storage-engine.service';
import { UserPhotoController } from './user-photo/user-photo.controller';

console.log(join('static', 'avatars'));
if (!existsSync(join('static', 'avatars'))) {
  mkdirSync(join('static', 'avatars'));
}
if (!existsSync(join('static', 'packs'))) {
  mkdirSync(join('static', 'packs'));
}
console.log(__dirname);
@Module({
  controllers: [UserPhotoController, AddAudioController],
  providers: [
    {
      provide: 'OPTIONS',
      useValue: {
        bucket: join('static', 'avatars'),
      },
    },
    {
      provide: 'AVATAR_OPTIONS',
      useValue: {
        bucket: join('static', 'avatars'),
      },
    },
    StorageEngineService,
    AudioStorageService,
  ],
  exports: [StorageEngineService, AudioStorageService],
})
export class UploadModule {}
