import {
  Field,
  GraphQLTimestamp,
  ID,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Pack } from 'src/_entities/pack.entity';
import { Paymentplan } from 'src/_entities/payment-plan.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '.';

export enum PaymentModel {
  PayPal = 'PayPal',
  MoPay = 'MoPay',
}

export enum PlanType {
  subscription = 'subscription',
  buy = 'buy',
}

registerEnumType(PaymentModel, { name: 'PaymentModel' });
registerEnumType(PlanType, { name: 'PlanType' });

@ObjectType()
@Entity('payment')
export class Payment extends BaseEntity {
  @Field(() => ID, { description: 'Example field (placeholder)' })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Field(() => PlanType, { description: 'Example field (placeholder)' })
  @Column('enum', { name: 'PlanType', enum: PlanType })
  type: PlanType;

  @Field(() => Int, { description: 'Example filed (placeholder)' })
  @Column('int', { name: 'price' })
  price: number;

  @Field(() => GraphQLTimestamp, { description: 'Example filed (placeholder)' })
  @Column('datetime', { name: 'date' })
  @CreateDateColumn()
  date: Date;

  @Field(() => GraphQLTimestamp, { description: 'Example filed (placeholder)' })
  @Column('datetime', { name: 'planStartDate' })
  planStartDate: Date;

  @Field(() => GraphQLTimestamp, { description: 'Example filed (placeholder)' })
  @Column('datetime', { name: 'planEndDate' })
  planEndDate: Date;

  @Field(() => PaymentModel, { description: 'Example filed (placeholder)' })
  @Column('enum', { name: 'paymentMode', enum: PaymentModel })
  paymentMode: PaymentModel;

  @Field({ description: 'Example filed (placeholder)' })
  @Column('varchar', { name: 'confirmationToken', length: 191 })
  confirmationToken: string;

  @Field(() => Int, { description: 'Example filed (placeholder)' })
  @Column('tinyint', { name: 'isActive', width: 1 })
  isActive: boolean;

  @Field(() => Pack, { description: 'Example filed (placeholder)' })
  @ManyToOne(() => Pack, (pack) => pack.payments, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  pack: Pack;

  @Field(() => Paymentplan, { description: 'Example filed (placeholder)' })
  @ManyToOne(() => Paymentplan, (paymentplan) => paymentplan.payments, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  paymentPlan: Paymentplan;

  @Field(() => User, { description: 'Example field (1)' })
  @ManyToOne(() => User, (user) => user.payments, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  user: User;
}
