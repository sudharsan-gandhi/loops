import { UploadedFile as AdminUploadedFile } from 'adminjs';
import { randomUUID } from 'crypto';
import { extname } from 'path';

import {
  Controller,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { StorageEngineService } from '../services/storage-engine.service';

// to write own cloud storage refer this
// https://github.com/alexandre-steinberg/multer-cloud-storage/blob/master/src/index.ts
@Controller()
export class UserPhotoController {
  constructor(private avatarStorage: StorageEngineService) {}

  @Post('upload/avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      // dest: './static/avatars',
      limits: { files: 1, fileSize: 2 * 1024 * 1024 },
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
    @Res() res,
  ) {
    const key = randomUUID() + extname(file.originalname);
    await this.avatarStorage.upload(file as any as AdminUploadedFile, key);
    res.json({
      path: key,
    });
  }
}
