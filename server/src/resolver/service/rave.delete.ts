import { Rave } from 'src/_entities';
import { Repository } from 'typeorm';

import { QueryService } from '@nestjs-query/core';
import { InjectRepository } from '@nestjs/typeorm';

import { KBTypeOrmQueryService } from './kbtypeorm.service';

@QueryService(Rave)
export class RaveDeleteService extends KBTypeOrmQueryService<Rave> {
  constructor(@InjectRepository(Rave) repo: Repository<Rave>) {
    // pass the use soft delete option to the service.
    super(repo, { useSoftDelete: true });
  }
}
