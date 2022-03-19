import { Paymentplan } from 'src/_entities';
import { JwtNoauthGuard } from 'src/auth/guards/jwt-noauth.guard';
import { Repository } from 'typeorm';

import {
  Filter,
  InjectQueryService,
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

// import {
//   Args,
//   ArgsType,
//   Query as GQuery,
// } from '@nestjs/graphql';

// @ArgsType()
// export class PaymentplanQuery extends QueryArgsType(Paymentplan) {}
// export const PaymentplanConnection = PaymentplanQuery.ConnectionType;

@QueryService(Paymentplan)
export class PaymentplanDeleteService extends KBTypeOrmQueryService<Paymentplan> {
  constructor(
    @InjectRepository(Paymentplan) repo: Repository<Paymentplan>,
    @InjectQueryService(Paymentplan)
    readonly service: QueryService<Paymentplan>,
  ) {
    // pass the use soft delete option to the service.
    super(repo, { useSoftDelete: true });
  }

  // @GQuery(() => PaymentplanConnection)
  // async paymentplanWithDeleted(
  //   @Args() query: PaymentplanQuery,
  // ): Promise<ConnectionType<Paymentplan>> {
  //   return PaymentplanConnection.createFromPromise(
  //     this.filterQueryBuilder.select(query).withDeleted().getMany(),
  //     query,
  //   );
  // }
  // async query(query: Query<Paymentplan>): Promise<Paymentplan[]> {

  // }
}


@Resolver(() => Paymentplan)
@UseGuards(JwtNoauthGuard)
@UseInterceptors(AuthorizerInterceptor(Paymentplan))
export class PaymentplanResolver {

  private readonly console = new Logger(PaymentplanResolver.name);

  constructor(readonly service: PaymentplanDeleteService) {
    this.console.debug("PaymentplanResolver");
  }

  @Mutation(() => Paymentplan)
  restoreOnePaymentplan(
    @Args('input', { type: () => ID }) id: number
  ): Promise<Paymentplan> {
    this.console.debug('called');
    return Promise.resolve(new Paymentplan());
  }

  @Mutation(() => UpdateManyResponseType())
  restoreManyPaymentplans(
    @Args('input', { type: () => FilterType(Paymentplan) }) filter: Filter<Paymentplan>,
  ): Promise<UpdateManyResponse> {
    return this.service.restoreMany(filter);
  }
}

