import { Module } from '@nestjs/common';

import { StorageEngineService } from './services/storage-engine.service';
import { UserPhotoController } from './user-photo/user-photo.controller';

@Module({
  controllers: [UserPhotoController],
  providers: [
    {
      provide: 'OPTIONS',
      useValue: {
        bucket: './static/avatars',
      },
    },
    StorageEngineService
  ],
  exports: [StorageEngineService]
})
export class UploadModule {}
