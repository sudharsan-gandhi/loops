import { Review } from 'src/_entities';
import { Repository } from 'typeorm';

import { QueryService } from '@nestjs-query/core';
import { InjectRepository } from '@nestjs/typeorm';

import { KBTypeOrmQueryService } from './kbtypeorm.service';

@QueryService(Review)
export class ReviewDeleteService extends KBTypeOrmQueryService<Review> {
  constructor(@InjectRepository(Review) repo: Repository<Review>) {
    // pass the use soft delete option to the service.
    super(repo, { useSoftDelete: true });
  }
}
