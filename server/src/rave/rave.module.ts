import { Module } from '@nestjs/common';
import { RaveService } from './rave.service';
import { RaveResolver } from './rave.resolver';

@Module({
  providers: [RaveResolver, RaveService]
})
export class RaveModule {}
