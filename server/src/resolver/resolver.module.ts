import {
  AutoResolverOpts,
  NestjsQueryGraphQLModule,
  PagingStrategies,
  ReadResolverOpts,
} from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { GqlJwtGuard } from 'src/auth/guards/gql-jwt.guard';
import { GqlRolesGuard } from 'src/auth/guards/gql-roles.guard';
import {
  AudioInputDTO,
  JobInputDTO,
  PackInputDTO,
  PaymentInputDTO,
  PaymentplanInputDTO,
  RaveInputDTO,
  UserInputDTO,
  UserUpdateDTO
} from 'src/_dto';
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
  {
    DTOClass: Job,
    EntityClass: Job,
    CreateDTOClass: JobInputDTO,
    UpdateDTOClass: JobInputDTO,
  },
  {
    DTOClass: Pack,
    EntityClass: Pack,
    CreateDTOClass: PackInputDTO,
    UpdateDTOClass: PackInputDTO,
  },
  {
    DTOClass: Paymentplan,
    EntityClass: Paymentplan,
    CreateDTOClass: PaymentplanInputDTO,
    UpdateDTOClass: PaymentplanInputDTO,
  },
  {
    DTOClass: Payment,
    EntityClass: Payment,
    CreateDTOClass: PaymentInputDTO,
    UpdateDTOClass: PaymentInputDTO,
  },
  {
    DTOClass: Rave,
    EntityClass: Rave,
    CreateDTOClass: RaveInputDTO,
    UpdateDTOClass: RaveInputDTO,
  },
  {
    DTOClass: User,
    EntityClass: User,
    CreateDTOClass: UserInputDTO,
    UpdateDTOClass: UserUpdateDTO,
    guards: [GqlJwtGuard, GqlRolesGuard],
  },
  {
    DTOClass: Review,
    EntityClass: Review,
    CreateDTOClass: JobInputDTO,
    UpdateDTOClass: JobInputDTO,
    guards: [GqlJwtGuard],
  },
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
