import { Grant } from 'src/_entities';
import { JwtNoauthGuard } from 'src/auth/guards/jwt-noauth.guard';
import { AccessControlService } from 'src/auth/service/access-control.service';
import { Repository } from 'typeorm';

import {
  DeepPartial,
  DeleteManyResponse,
  DeleteOneOptions,
  Filter,
  Filterable,
  QueryService,
  UpdateManyResponse,
  UpdateOneOptions,
} from '@nestjs-query/core';
import {
  AuthorizerFilter,
  AuthorizerInterceptor,
  FilterType,
  OperationGroup,
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

@QueryService(Grant)
export class GrantDeleteService extends KBTypeOrmQueryService<Grant> {
  constructor(
    @InjectRepository(Grant) repo: Repository<Grant>,
    private acl: AccessControlService,
  ) {
    // pass the use soft delete option to the service.
    super(repo, { useSoftDelete: true });
  }

  async createOne(record: DeepPartial<Grant>): Promise<Grant> {
    const grant: Grant = await super.createOne(record);
    this.reloadAcl(grant);
    return grant;
  }

  async createMany(records: DeepPartial<Grant>[]): Promise<Grant[]> {
    const grants: Grant[] = await super.createMany(records);
    this.reloadAcl(grants);
    return grants;
  }

  async updateOne(
    id: string | number,
    update: DeepPartial<Grant>,
    opts?: UpdateOneOptions<Grant>,
  ): Promise<Grant> {
    const grant = await super.updateOne(id, update);
    this.reloadAcl(grant);
    return grant;
  }

  async updateMany(
    update: DeepPartial<Grant>,
    filter: Filter<Grant>,
  ): Promise<UpdateManyResponse> {
    const resp = await super.updateMany(update, filter);
    this.reloadAcl(resp);
    return resp;
  }

  async deleteOne(
    id: string | number,
    opts?: DeleteOneOptions<Grant>,
  ): Promise<Grant> {
    const grant = await super.deleteOne(id, opts);
    this.reloadAcl(grant);
    return grant;
  }

  async deleteMany(filter: Filter<Grant>): Promise<DeleteManyResponse> {
    const resp = await super.deleteMany(filter);
    this.reloadAcl(resp);
    return resp;
  }

  async restoreOne(
    id: string | number,
    opts?: Filterable<Grant>,
  ): Promise<Grant> {
    console.log('called here');
    const resp = await super.restoreOne(id, opts);
    this.reloadAcl(resp);
    return resp;
  }

  async restoreMany(filter: Filter<Grant>): Promise<UpdateManyResponse> {
    const resp = await super.restoreMany(filter);
    this.reloadAcl(resp);
    return resp;
  }

  private reloadAcl(grant: any) {
    if (!!grant) {
      this.acl.reload();
    }
  }
}

@Resolver(() => Grant)
@UseGuards(JwtNoauthGuard)
@UseInterceptors(AuthorizerInterceptor(Grant))
export class GrantResolver {

  private readonly console = new Logger(GrantResolver.name);

  constructor(readonly service: GrantDeleteService) {}

  @Mutation(() => Grant)
  restoreOneGrant(
    @Args('input', { type: () => ID }) id: number,
    @AuthorizerFilter({
      readonly: false,
      operationGroup: OperationGroup.UPDATE,
      many: false,
    })
    authFilter: Filter<Grant>,
  ): Promise<Grant> {
    this.console.debug('called');
    return Promise.resolve(new Grant());
  }

  @Mutation(() => UpdateManyResponseType())
  restoreManyGrants(
    @Args('input', { type: () => FilterType(Grant) }) filter: Filter<Grant>,
  ): Promise<UpdateManyResponse> {
    return this.service.restoreMany(filter);
  }
}
