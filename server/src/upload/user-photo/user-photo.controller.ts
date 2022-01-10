import { renameSync } from 'fs';
import { extname } from 'path';

import {
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

// to write own cloud storage refer this
// https://github.com/alexandre-steinberg/multer-cloud-storage/blob/master/src/index.ts
@Controller()
export class UserPhotoController {
  @Post('upload/avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './static/avatars',
      limits: { files: 1 },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Res() res) {
    console.log(file);
    const storedPath = file.path;
    const withExtension = storedPath + extname(file.originalname);
    renameSync(storedPath, withExtension);
    res.json({ path: withExtension.replace(/static\\/g, '').replace(/\\/g, '/') });
  }
}
