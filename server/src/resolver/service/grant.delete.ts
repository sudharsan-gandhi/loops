import { Grant } from 'src/_entities';
import { Repository } from 'typeorm';

import { QueryService } from '@nestjs-query/core';
import { InjectRepository } from '@nestjs/typeorm';

import { KBTypeOrmQueryService } from './kbtypeorm.service';

@QueryService(Grant)
export class GrantDeleteService extends KBTypeOrmQueryService<Grant> {
  constructor(@InjectRepository(Grant) repo: Repository<Grant>) {
    // pass the use soft delete option to the service.
    super(repo, { useSoftDelete: true });
  }
}
