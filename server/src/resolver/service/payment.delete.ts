import { Payment } from 'src/_entities';
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

@QueryService(Payment)
export class PaymentDeleteService extends KBTypeOrmQueryService<Payment> {
  constructor(@InjectRepository(Payment) repo: Repository<Payment>) {
    // pass the use soft delete option to the service.
    super(repo, { useSoftDelete: true });
  }
}

@Resolver(() => Payment)
@UseGuards(JwtNoauthGuard)
@UseInterceptors(AuthorizerInterceptor(Payment))
export class PaymentResolver {
  private readonly console = new Logger(PaymentResolver.name);

  constructor(readonly service: PaymentDeleteService) {
    this.console.debug('PaymentResolver');
  }

  @Mutation(() => Payment)
  restoreOnePayment(
    @Args('input', { type: () => ID }) id: number,
  ): Promise<Payment> {
    this.console.debug('called');
    return Promise.resolve(new Payment());
  }

  @Mutation(() => UpdateManyResponseType())
  restoreManyPayments(
    @Args('input', { type: () => FilterType(Payment) }) filter: Filter<Payment>,
  ): Promise<UpdateManyResponse> {
    return this.service.restoreMany(filter);
  }
}
