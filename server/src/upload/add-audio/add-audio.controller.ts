import { UploadedFile as AdminUploadedFile } from 'adminjs';
import { randomUUID } from 'crypto';
import { extname } from 'path';
import {
  Audio,
  Pack,
} from 'src/_entities';

import {
  Controller,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

import { AudioStorageService } from '../services/audio-storage.service';

@Controller()
export class AddAudioController {
  constructor(private storage: AudioStorageService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('upload/audio')
  @UseInterceptors(
    FileInterceptor('file', {
      // dest: './static/avatars',
      limits: { files: 1, fileSize: 100 * 1024 * 1024},
    }),
  )
  async uploadAudio(
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
    @Res() res,
  ) {
    const key = randomUUID() + extname(file.originalname);
    await this.storage.upload(file as any as AdminUploadedFile, key);
    res.json({
      path: key,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('pack/:packId/audio/:audioId')
  async deleteAudio(
    @Param('packId') packId: string,
    @Param('audioId') audioId,
    @Req() req,
  ) {
    const pack = await Pack.findOne(packId);
    const audio = await Audio.findOne<Audio>(audioId);
    if (
      pack &&
      audio &&
      req.user.id === pack.authorId &&
      pack.id === audio.packId
    ) {
      this.storage.delete(audio.path);
      return true;
    }
  }
}
