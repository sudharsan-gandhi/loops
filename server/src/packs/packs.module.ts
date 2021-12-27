import { Module } from '@nestjs/common';
import { PacksService } from './packs.service';
import { PacksResolver } from './packs.resolver';

@Module({
  providers: [PacksResolver, PacksService]
})
export class PacksModule {}
