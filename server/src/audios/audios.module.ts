import { Module } from '@nestjs/common';
import { AudiosService } from './audios.service';
import { AudiosResolver } from './audios.resolver';

@Module({
  providers: [AudiosResolver, AudiosService]
})
export class AudiosModule {}
