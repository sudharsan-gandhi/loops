import { Rave } from 'src/_entities';
import { JwtNoauthGuard } from 'src/auth/guards/jwt-noauth.guard';
import { Repository } from 'typeorm';

import { QueryService } from '@nestjs-query/core';
import { AuthorizerInterceptor } from '@nestjs-query/query-graphql';
import {
  Logger,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
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
    this.console.debug("RaveResolver");
  }

}

