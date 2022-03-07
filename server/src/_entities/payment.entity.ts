import { GraphQLBoolean } from 'graphql';
import { Pack } from 'src/_entities/pack.entity';
import { Paymentplan } from 'src/_entities/payment-plan.entity';
import { PaymentAuthorizer } from 'src/resolver/authorizer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import {
  Authorize,
  FilterableField,
  IDField,
  Relation,
} from '@nestjs-query/query-graphql';
import {
  Field,
  GraphQLTimestamp,
  ID,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

import { User } from './';

export enum PaymentModel {
  PayPal = 'PayPal',
  MoPay = 'MoPay',
  Gift = 'Gift',
}

export enum PlanType {
  subscription = 'subscription',
  buy = 'buy',
}

registerEnumType(PaymentModel, { name: 'PaymentModel' });
registerEnumType(PlanType, { name: 'PlanType' });

@ObjectType('payment')
@Entity('payment')
@Relation('pack', () => Pack, { disableRemove: true })
@Relation('paymentPlan', () => Paymentplan, { disableRemove: true })
@Relation('user', () => User, { disableRemove: true })
@Authorize(PaymentAuthorizer)
export class Payment extends BaseEntity {
  @IDField(() => ID, { description: 'Example field (placeholder)' })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @FilterableField(() => PlanType, {
    description: 'Example field (placeholder)',
  })
  @Column('enum', { name: 'PlanType', enum: PlanType })
  type: PlanType;

  @FilterableField(() => Int, { description: 'Example filed (placeholder)' })
  @Column('int', { name: 'price' })
  price: number;

  @FilterableField(() => GraphQLTimestamp, {
    description: 'Example filed (placeholder)',
  })
  @Column('datetime', { name: 'planStartDate' })
  planStartDate: Date;

  @FilterableField(() => GraphQLTimestamp, {
    description: 'Example filed (placeholder)',
  })
  @Column('datetime', { name: 'planEndDate' })
  planEndDate: Date;

  @FilterableField(() => PaymentModel, {
    description: 'Example filed (placeholder)',
  })
  @Column('enum', { name: 'paymentMode', enum: PaymentModel })
  paymentMode: PaymentModel;

  @Field({ description: 'Example filed (placeholder)', nullable: true })
  @Column('varchar', { name: 'confirmationToken', nullable: true, length: 191 })
  confirmationToken: string;

  @FilterableField(() => GraphQLBoolean, {
    description: 'Example filed (placeholder)',
    allowedComparisons: ['eq'],
  })
  @Column('boolean', { name: 'isActive', nullable: true, default: true })
  isActive: boolean;

  @FilterableField(() => GraphQLTimestamp, {
    description: 'Example field (placeholder)',
  })
  @Column('datetime', {
    name: 'postDate',
  })
  @CreateDateColumn()
  postDate: Date;

  @FilterableField(() => GraphQLTimestamp, {
    description: 'Example field (placeholder)',
  })
  @Column('datetime', { name: 'updatedAt' })
  @UpdateDateColumn()
  updatedAt: Date;

  @FilterableField(() => ID)
  @Column('int')
  packId: number;

  @FilterableField(() => ID)
  @Column('int')
  paymentPlanId: number;

  @FilterableField(() => ID)
  @Column('int')
  userId: number;

  @ManyToOne(() => Pack, (pack) => pack.payments, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  pack: Pack;

  @ManyToOne(() => Paymentplan, (paymentplan) => paymentplan.payments, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  paymentPlan: Paymentplan;

  @ManyToOne(() => User, (user) => user.payments, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  user: User;
}
