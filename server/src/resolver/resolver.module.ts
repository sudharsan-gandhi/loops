import {
  AudioInputDTO,
  AudioUpdateDTO,
  JobInputDTO,
  PackInputDTO,
  PackUpdateDTO,
  PaymentInputDTO,
  PaymentplanInputDTO,
  RaveInputDTO,
  ReviewInputDTO,
  UserInputDTO,
  UserUpdateDTO,
} from 'src/_dto';
import { GrantDTO } from 'src/_dto/grant.dto';
import {
  Grant,
  Job,
  Loop,
  Pack,
  Payment,
  Paymentplan,
  Rave,
  User,
} from 'src/_entities';
import { Review } from 'src/_entities/review.entity';
import { AuthModule } from 'src/auth/auth.module';
import { GqlJwtGuard } from 'src/auth/guards/gql-jwt.guard';
import { JwtNoauthGuard } from 'src/auth/guards/jwt-noauth.guard';
import { ENTITIES } from 'src/entities';

import {
  AutoResolverOpts,
  NestjsQueryGraphQLModule,
  PagingStrategies,
  ReadResolverOpts,
} from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';

import {
  GrantDeleteService,
  JobDeleteService,
  LoopDeleteService,
  PackDeleteService,
  PaymentDeleteService,
  PaymentplanDeleteService,
  RaveDeleteService,
  ReviewDeleteService,
  UserDeleteService,
} from './service';

const DEFAULT_RESOLVERS: AutoResolverOpts<
  any,
  any,
  unknown,
  unknown,
  ReadResolverOpts<any>,
  PagingStrategies
>[] = [
  {
    DTOClass: Loop,
    ServiceClass: LoopDeleteService,
    EntityClass: Loop,
    CreateDTOClass: AudioInputDTO,
    UpdateDTOClass: AudioUpdateDTO,
    read: { guards: [JwtNoauthGuard] },
    create: { guards: [GqlJwtGuard], many: { disabled: true } },
    update: { guards: [GqlJwtGuard], many: { disabled: true } },
    delete: { guards: [GqlJwtGuard], many: { guards: [GqlJwtGuard] } },
  },
  {
    DTOClass: Job,
    ServiceClass: JobDeleteService,
    EntityClass: Job,
    CreateDTOClass: JobInputDTO,
    UpdateDTOClass: JobInputDTO,
    read: { guards: [JwtNoauthGuard] },
    create: { guards: [GqlJwtGuard], many: { disabled: true } },
    update: { guards: [GqlJwtGuard], many: { disabled: true } },
    delete: { guards: [GqlJwtGuard], many: { guards: [GqlJwtGuard] } },
  },
  {
    DTOClass: Pack,
    ServiceClass: PackDeleteService,
    EntityClass: Pack,
    CreateDTOClass: PackInputDTO,
    UpdateDTOClass: PackUpdateDTO,
    read: { guards: [JwtNoauthGuard] },
    create: { guards: [GqlJwtGuard], many: { disabled: true } },
    update: { guards: [GqlJwtGuard], many: { disabled: true } },
    delete: { guards: [GqlJwtGuard], many: { guards: [GqlJwtGuard] } },
  },
  {
    DTOClass: Paymentplan,
    ServiceClass: PaymentplanDeleteService,
    EntityClass: Paymentplan,
    CreateDTOClass: PaymentplanInputDTO,
    UpdateDTOClass: PaymentplanInputDTO,
    read: { guards: [JwtNoauthGuard] },
    create: { guards: [GqlJwtGuard], many: { disabled: true } },
    update: { guards: [GqlJwtGuard], many: { disabled: true } },
    delete: { guards: [GqlJwtGuard], many: { guards: [GqlJwtGuard] } },
  },
  {
    DTOClass: Payment,
    ServiceClass: PaymentDeleteService,
    EntityClass: Payment,
    CreateDTOClass: PaymentInputDTO,
    UpdateDTOClass: PaymentInputDTO,
    read: { guards: [JwtNoauthGuard] },
    create: { guards: [GqlJwtGuard], many: { disabled: true } },
    update: { guards: [GqlJwtGuard], many: { disabled: true } },
  },
  {
    DTOClass: Rave,
    ServiceClass: RaveDeleteService,
    EntityClass: Rave,
    CreateDTOClass: RaveInputDTO,
    UpdateDTOClass: RaveInputDTO,
    read: { guards: [JwtNoauthGuard] },
    create: { guards: [GqlJwtGuard], many: { disabled: true } },
    update: { guards: [GqlJwtGuard], many: { disabled: true } },
    delete: { guards: [GqlJwtGuard], many: { guards: [GqlJwtGuard] } },
  },
  {
    DTOClass: User,
    ServiceClass: UserDeleteService,
    EntityClass: User,
    CreateDTOClass: UserInputDTO,
    UpdateDTOClass: UserUpdateDTO,
    // pagingStrategy: PagingStrategies.OFFSET,
    read: { guards: [JwtNoauthGuard] },
    create: { guards: [JwtNoauthGuard], many: { disabled: true } },
    update: { guards: [GqlJwtGuard], many: { disabled: true } },
    delete: { guards: [GqlJwtGuard], many: { guards: [GqlJwtGuard] } },
  },
  {
    DTOClass: Review,
    ServiceClass: ReviewDeleteService,
    EntityClass: Review,
    CreateDTOClass: ReviewInputDTO,
    UpdateDTOClass: ReviewInputDTO,
    // guards: [GqlRolesGuard],
    read: { guards: [JwtNoauthGuard] },
    create: { guards: [JwtNoauthGuard], many: { disabled: true } },
    update: { guards: [GqlJwtGuard], many: { disabled: true } },
    delete: { guards: [GqlJwtGuard], many: { guards: [GqlJwtGuard] } },
  },
  {
    DTOClass: Grant,
    ServiceClass: GrantDeleteService,
    EntityClass: Grant,
    CreateDTOClass: GrantDTO,
    UpdateDTOClass: GrantDTO,
    read: { guards: [GqlJwtGuard] },
    create: { guards: [GqlJwtGuard], many: { disabled: true } },
    update: { guards: [GqlJwtGuard], many: { disabled: true } },
    delete: { guards: [GqlJwtGuard], many: { guards: [GqlJwtGuard] } },
  },
];
@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature(ENTITIES), AuthModule],
      services: [
        GrantDeleteService,
        JobDeleteService,
        LoopDeleteService,
        PackDeleteService,
        PaymentDeleteService,
        PaymentplanDeleteService,
        RaveDeleteService,
        ReviewDeleteService,
        UserDeleteService,
      ],
      resolvers: [...DEFAULT_RESOLVERS],
    }),
  ],
})
export class ResolverModule {}
