import { Module } from '@nestjs/common';
import { UserPhotoController } from './user-photo/user-photo.controller';

@Module({
  controllers: [UserPhotoController]
})
export class UploadModule {}
