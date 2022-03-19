import { Loop } from 'src/_entities';
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

@QueryService(Loop)
export class LoopDeleteService extends KBTypeOrmQueryService<Loop> {
  constructor(@InjectRepository(Loop) repo: Repository<Loop>) {
    // pass the use soft delete option to the service.
    super(repo, { useSoftDelete: true });
  }
}


@Resolver(() => Loop)
@UseGuards(JwtNoauthGuard)
@UseInterceptors(AuthorizerInterceptor(Loop))
export class LoopResolver {

  private readonly console = new Logger(LoopResolver.name);

  constructor(readonly service: LoopDeleteService) {
    this.console.debug("LoopResolver");
  }

  @Mutation(() => Loop)
  restoreOneLoop(
    @Args('input', { type: () => ID }) id: number
  ): Promise<Loop> {
    this.console.debug('called');
    return Promise.resolve(new Loop());
  }

  @Mutation(() => UpdateManyResponseType())
  restoreManyLoops(
    @Args('input', { type: () => FilterType(Loop) }) filter: Filter<Loop>,
  ): Promise<UpdateManyResponse> {
    return this.service.restoreMany(filter);
  }
}

