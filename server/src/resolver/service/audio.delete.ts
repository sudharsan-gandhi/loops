import { Loop } from 'src/_entities';
import { Repository } from 'typeorm';

import { QueryService } from '@nestjs-query/core';
import { InjectRepository } from '@nestjs/typeorm';

import { KBTypeOrmQueryService } from './kbtypeorm.service';

@QueryService(Loop)
export class LoopDeleteService extends KBTypeOrmQueryService<Loop> {
  constructor(@InjectRepository(Loop) repo: Repository<Loop>) {
    // pass the use soft delete option to the service.
    super(repo, { useSoftDelete: true });
  }
}
