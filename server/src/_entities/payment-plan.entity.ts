import { GraphQLBoolean } from 'graphql';
import { Payment } from 'src/_entities/payment.entity';
import { User } from 'src/_entities/user.entity';
import { PaymentPlanAuthorizer } from 'src/resolver/authorizer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import {
  Authorize,
  CursorConnection,
  FilterableField,
  IDField,
  Relation,
} from '@nestjs-query/query-graphql';
import {
  Field,
  Float,
  GraphQLTimestamp,
  ID,
  Int,
  ObjectType,
} from '@nestjs/graphql';

@ObjectType('paymentplan')
@Entity('paymentplan')
@CursorConnection('payments', () => Payment, { disableRemove: true })
@Relation('postedBy', () => User, { disableRemove: true })
@Authorize(PaymentPlanAuthorizer)
export class Paymentplan extends BaseEntity {
  @IDField(() => ID, { description: 'Example field (placeholder)' })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @FilterableField({ description: 'Example field (placeholder)' })
  @Column('varchar', { name: 'title', length: 191 })
  title: string;

  @Field({ description: 'Example field (placeholder)' })
  @Column('varchar', { name: 'description', length: 191 })
  description: string;

  @FilterableField(() => Float, { description: 'Example field (placeholder)' })
  @Column('int', { name: 'amount' })
  amount: number;

  @Field(() => Int, { description: 'Example field (placeholder)' })
  @Column('int', { name: 'month' })
  month: number;

  @FilterableField(() => GraphQLTimestamp, { description: 'Example field (placeholder)' })
  @Column('datetime', {
    name: 'postDate',
  })
  @CreateDateColumn()
  postDate: Date;

  @FilterableField(() => GraphQLTimestamp, { description: 'Example field (placeholder)' })
  @Column('datetime', { name: 'updatedAt' })
  @UpdateDateColumn()
  updatedAt: Date;

  @FilterableField(() => ID)
  @Column('int')
  postedById: number;

  @FilterableField(() => GraphQLBoolean, {
    description: 'Example filed (placeholder)',
    allowedComparisons: ['eq'],
  })
  @Column('boolean', { name: 'isActive', nullable: true, default: true })
  isActive: boolean;

  @ManyToOne(() => User)
  postedBy: User;

  @OneToMany(() => Payment, (payment) => payment.paymentPlan)
  payments: Payment[];
}
