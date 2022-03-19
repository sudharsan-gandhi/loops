import { User } from 'src/_entities';
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

@QueryService(User)
export class UserDeleteService extends KBTypeOrmQueryService<User> {
  constructor(@InjectRepository(User) repo: Repository<User>) {
    // pass the use soft delete option to the service.
    super(repo, { useSoftDelete: true });
  }
}

@Resolver(() => User)
@UseGuards(JwtNoauthGuard)
@UseInterceptors(AuthorizerInterceptor(User))
export class UserResolver {

  private readonly console = new Logger(UserResolver.name);

  constructor(readonly service: UserDeleteService) {
    this.console.debug("UserResolver");
  }

  @Mutation(() => User)
  restoreOneUser(
    @Args('input', { type: () => ID }) id: number
  ): Promise<User> {
    this.console.debug('called');
    return Promise.resolve(new User());
  }

  @Mutation(() => UpdateManyResponseType())
  restoreManyUsers(
    @Args('input', { type: () => FilterType(User) }) filter: Filter<User>,
  ): Promise<UpdateManyResponse> {
    return this.service.restoreMany(filter);
  }
}

