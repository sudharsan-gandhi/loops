import { Job } from 'src/_entities';
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

@QueryService(Job)
export class JobDeleteService extends KBTypeOrmQueryService<Job> {
  constructor(@InjectRepository(Job) repo: Repository<Job>) {
    // pass the use soft delete option to the service.
    super(repo, { useSoftDelete: true });
  }
}

@Resolver(() => Job)
@UseGuards(JwtNoauthGuard)
@UseInterceptors(AuthorizerInterceptor(Job))
export class JobResolver {

  private readonly console = new Logger(JobResolver.name);

  constructor(readonly service: JobDeleteService) {
    this.console.debug("JobResolver");
  }

  @Mutation(() => Job)
  restoreOneJob(
    @Args('input', { type: () => ID }) id: number
  ): Promise<Job> {
    this.console.debug('called');
    return Promise.resolve(new Job());
  }

  @Mutation(() => UpdateManyResponseType())
  restoreManyJobs(
    @Args('input', { type: () => FilterType(Job) }) filter: Filter<Job>,
  ): Promise<UpdateManyResponse> {
    return this.service.restoreMany(filter);
  }
}

