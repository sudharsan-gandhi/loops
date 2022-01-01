import {
  AutoResolverOpts,
  NestjsQueryGraphQLModule,
  PagingStrategies,
  ReadResolverOpts,
} from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { GqlJwtGuard } from 'src/auth/gql-jwt.guard';
import { AudioInputDTO } from 'src/_dto';
import {
  Audio,
  Job,
  Pack,
  Payment,
  Paymentplan,
  Rave,
  User,
} from 'src/_entities';
import { Review } from 'src/_entities/review.entity';

const ENTITY_MODDULES = [
  NestjsQueryTypeOrmModule.forFeature([Audio]),
  NestjsQueryTypeOrmModule.forFeature([Job]),
  NestjsQueryTypeOrmModule.forFeature([Pack]),
  NestjsQueryTypeOrmModule.forFeature([Paymentplan]),
  NestjsQueryTypeOrmModule.forFeature([Payment]),
  NestjsQueryTypeOrmModule.forFeature([Rave]),
  NestjsQueryTypeOrmModule.forFeature([User]),
  NestjsQueryTypeOrmModule.forFeature([Review]),
];

const DEFAULT_RESOLVERS: AutoResolverOpts<
  any,
  any,
  unknown,
  unknown,
  ReadResolverOpts<any>,
  PagingStrategies
>[] = [
  {
    DTOClass: Audio,
    EntityClass: Audio,
    CreateDTOClass: AudioInputDTO,
    UpdateDTOClass: AudioInputDTO,
    guards: [GqlJwtGuard],
  },
  { DTOClass: Job, EntityClass: Job },
  { DTOClass: Pack, EntityClass: Pack },
  { DTOClass: Paymentplan, EntityClass: Paymentplan },
  { DTOClass: Payment, EntityClass: Payment },
  { DTOClass: Rave, EntityClass: Rave },
  { DTOClass: User, EntityClass: User, guards: [GqlJwtGuard] },
  { DTOClass: Review, EntityClass: Review, guards: [GqlJwtGuard] },
];
@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [...ENTITY_MODDULES, AuthModule],
      services: [],
      resolvers: [...DEFAULT_RESOLVERS],
    }),
  ],
})
export class ResolverModule {}
