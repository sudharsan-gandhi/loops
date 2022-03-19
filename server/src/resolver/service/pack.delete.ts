import { Pack } from 'src/_entities';
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

@QueryService(Pack)
export class PackDeleteService extends KBTypeOrmQueryService<Pack> {
  constructor(@InjectRepository(Pack) repo: Repository<Pack>) {
    // pass the use soft delete option to the service.
    super(repo, { useSoftDelete: true });
  }
}

@Resolver(() => Pack)
@UseGuards(JwtNoauthGuard)
@UseInterceptors(AuthorizerInterceptor(Pack))
export class PackResolver {
  private readonly console = new Logger(PackResolver.name);

  constructor(readonly service: PackDeleteService) {
    this.console.debug('PackResolver');
  }

  @Mutation(() => Pack)
  restoreOnePack(@Args('input', { type: () => ID }) id: number): Promise<Pack> {
    this.console.debug('called');
    return Promise.resolve(new Pack());
  }

  @Mutation(() => UpdateManyResponseType())
  restoreManyPacks(
    @Args('input', { type: () => FilterType(Pack) }) filter: Filter<Pack>,
  ): Promise<UpdateManyResponse> {
    return this.service.restoreMany(filter);
  }
}
