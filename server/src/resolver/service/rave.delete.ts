import { Rave } from 'src/_entities';
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

@QueryService(Rave)
export class RaveDeleteService extends KBTypeOrmQueryService<Rave> {
  constructor(@InjectRepository(Rave) repo: Repository<Rave>) {
    // pass the use soft delete option to the service.
    super(repo, { useSoftDelete: true });
  }
}


@Resolver(() => Rave)
@UseGuards(JwtNoauthGuard)
@UseInterceptors(AuthorizerInterceptor(Rave))
export class RaveResolver {
  private readonly console = new Logger(RaveResolver.name);

  constructor(readonly service: RaveDeleteService) {
    this.console.debug('RaveResolver');
  }

  @Mutation(() => Rave)
  restoreOneRave(
    @Args('input', { type: () => ID }) id: number,
  ): Promise<Rave> {
    this.console.debug('called');
    return Promise.resolve(new Rave());
  }

  @Mutation(() => UpdateManyResponseType())
  restoreManyRaves(
    @Args('input', { type: () => FilterType(Rave) }) filter: Filter<Rave>,
  ): Promise<UpdateManyResponse> {
    return this.service.restoreMany(filter);
  }
}

