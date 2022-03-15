import { User } from 'src/_entities';
import { Repository } from 'typeorm';

import { QueryService } from '@nestjs-query/core';
import { InjectRepository } from '@nestjs/typeorm';

import { KBTypeOrmQueryService } from './kbtypeorm.service';

@QueryService(User)
export class UserDeleteService extends KBTypeOrmQueryService<User> {
  constructor(@InjectRepository(User) repo: Repository<User>) {
    // pass the use soft delete option to the service.
    super(repo, { useSoftDelete: true });
  }
}
