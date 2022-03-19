import { Review } from 'src/_entities';
import { JwtNoauthGuard } from 'src/auth/guards/jwt-noauth.guard';
import { Repository } from 'typeorm';

import {
  Filter,
  QueryService,
  UpdateManyResponse,
} from '@nestjs-query/core';
import {
  AuthorizerInterceptor,
  FilterType,
  UpdateManyResponseType,
} from '@nestjs-query/query-graphql';
import {
  Logger,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  Args,
  ID,
  Mutation,
  Resolver,
} from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';

import { KBTypeOrmQueryService } from './kbtypeorm.service';

@QueryService(Review)
export class ReviewDeleteService extends KBTypeOrmQueryService<Review> {
  constructor(@InjectRepository(Review) repo: Repository<Review>) {
    // pass the use soft delete option to the service.
    super(repo, { useSoftDelete: true });
  }
}


@Resolver(() => Review)
@UseGuards(JwtNoauthGuard)
@UseInterceptors(AuthorizerInterceptor(Review))
export class ReviewResolver {

  private readonly console = new Logger(ReviewResolver.name);

  constructor(readonly service: ReviewDeleteService) {
    this.console.debug("ReviewResolver");
  }

  @Mutation(() => Review)
  restoreOneReview(
    @Args('input', { type: () => ID }) id: number
  ): Promise<Review> {
    this.console.debug('called');
    return Promise.resolve(new Review());
  }

  @Mutation(() => UpdateManyResponseType())
  restoreManyReviews(
    @Args('input', { type: () => FilterType(Review) }) filter: Filter<Review>,
  ): Promise<UpdateManyResponse> {
    return this.service.restoreMany(filter);
  }
}

