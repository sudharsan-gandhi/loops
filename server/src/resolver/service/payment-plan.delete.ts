import { Paymentplan } from 'src/_entities';
import { Repository } from 'typeorm';

import {
  InjectQueryService,
  QueryService,
} from '@nestjs-query/core';
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
