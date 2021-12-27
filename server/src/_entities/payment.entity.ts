import {
  ObjectType,
  Field,
  Int,
  ID,
  GraphQLTimestamp,
  registerEnumType,
} from '@nestjs/graphql';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pack } from 'src/_entities/pack.entity';
import { Paymentplan } from 'src/_entities/payment-plan.entity';

export enum PaymentModel {
  PayPal = 'PayPal',
  MoPay = 'MoPay',
}

export enum PlanType {
  subscription = 'subscription',
  buy = 'buy',
}

registerEnumType(PaymentModel, { name: 'PaymentModel' });

@ObjectType()
@Index('Payments_packId_fkey', ['packId'], {})
@Index('Payments_paymentPlanId_fkey', ['paymentPlanId'], {})
@Entity('payments', { schema: 'testing' })
export class Payments {
  @Field(() => ID, { description: 'Example field (placeholder)' })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Field(() => PlanType, { description: 'Example field (placeholder)' })
  @Column('enum', { name: 'type', enum: ['subscription', 'buy'] })
  type: PlanType;

  @Field(() => Int, { description: 'Example filed (placeholder)' })
  @Column('int', { name: 'price' })
  price: number;

  @Field(() => GraphQLTimestamp, { description: 'Example filed (placeholder)' })
  @Column('datetime', { name: 'date', default: () => "'CURRENT_TIMESTAMP(3)'" })
  date: Date;

  @Field(() => GraphQLTimestamp, { description: 'Example filed (placeholder)' })
  @Column('datetime', { name: 'planStartDate' })
  planStartDate: Date;

  @Field(() => GraphQLTimestamp, { description: 'Example filed (placeholder)' })
  @Column('datetime', { name: 'planEndDate' })
  planEndDate: Date;

  @Field(() => PaymentModel, { description: 'Example filed (placeholder)' })
  @Column('enum', { name: 'paymentMode', enum: ['PayPal', 'MoPay'] })
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
  @JoinColumn([{ name: 'packId', referencedColumnName: 'id' }])
  pack: Pack;

  @Field(() => Paymentplan, { description: 'Example filed (placeholder)' })
  @ManyToOne(() => Paymentplan, (paymentplan) => paymentplan.payments, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'paymentPlanId', referencedColumnName: 'id' }])
  paymentPlan: Paymentplan;
}
