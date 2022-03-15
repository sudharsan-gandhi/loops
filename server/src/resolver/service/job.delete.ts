import { Job } from 'src/_entities';
import { Repository } from 'typeorm';

import { QueryService } from '@nestjs-query/core';
import { InjectRepository } from '@nestjs/typeorm';

import { KBTypeOrmQueryService } from './kbtypeorm.service';

@QueryService(Job)
export class JobDeleteService extends KBTypeOrmQueryService<Job> {
  constructor(@InjectRepository(Job) repo: Repository<Job>) {
    // pass the use soft delete option to the service.
    super(repo, { useSoftDelete: true });
  }
}
