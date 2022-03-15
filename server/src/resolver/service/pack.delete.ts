import { Pack } from 'src/_entities';
import { Repository } from 'typeorm';

import { QueryService } from '@nestjs-query/core';
import { InjectRepository } from '@nestjs/typeorm';

import { KBTypeOrmQueryService } from './kbtypeorm.service';

@QueryService(Pack)
export class PackDeleteService extends KBTypeOrmQueryService<Pack> {
  constructor(@InjectRepository(Pack) repo: Repository<Pack>) {
    // pass the use soft delete option to the service.
    super(repo, { useSoftDelete: true });
  }
}
