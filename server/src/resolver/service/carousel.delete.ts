import { Carousel } from 'src/_entities';
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

@QueryService(Carousel)
export class CarouselDeleteService extends KBTypeOrmQueryService<Carousel> {
  constructor(@InjectRepository(Carousel) repo: Repository<Carousel>) {
    // pass the use soft delete option to the service.
    super(repo, { useSoftDelete: true });
  }
}

@Resolver(() => Carousel)
@UseGuards(JwtNoauthGuard)
@UseInterceptors(AuthorizerInterceptor(Carousel))
export class CarouselResolver {
  private readonly console = new Logger(CarouselResolver.name);

  constructor(readonly service: CarouselDeleteService) {
    this.console.debug('CarouselResolver');
  }

  @Mutation(() => Carousel)
  restoreOneCarousel(
    @Args('input', { type: () => ID }) id: number,
  ): Promise<Carousel> {
    this.console.debug('called');
    return Promise.resolve(new Carousel());
  }

  @Mutation(() => UpdateManyResponseType())
  restoreManyCarousels(
    @Args('input', { type: () => FilterType(Carousel) })
    filter: Filter<Carousel>,
  ): Promise<UpdateManyResponse> {
    return this.service.restoreMany(filter);
  }
}
