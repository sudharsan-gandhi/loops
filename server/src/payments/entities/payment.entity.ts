import { ObjectType, Field, Int, ID, GraphQLTimestamp } from '@nestjs/graphql';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pack } from 'src/packs/entities/pack.entity';
import { Paymentplan } from 'src/payment-plans/entities/payment-plan.entity';
import { GraphQLID } from 'graphql';

@ObjectType()
@Index('Payments_packId_fkey', ['packId'], {})
@Index('Payments_paymentPlanId_fkey', ['paymentPlanId'], {})
@Entity('payments', { schema: 'testing' })
export class Payments {
  @Field(() => ID, { description: 'Example field (placeholder)' })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Field(() => String, { description: 'Example field (placeholder)' })
  @Column('enum', { name: 'type', enum: ['subscription', 'buy'] })
  type: 'subscription' | 'buy';

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

  @Field(() => String, { description: 'Example filed (placeholder)' })
  @Column('enum', { name: 'paymentMode', enum: ['PayPal', 'MoPay'] })
  paymentMode: 'PayPal' | 'MoPay';

  @Field({ description: 'Example filed (placeholder)' })
  @Column('varchar', { name: 'confirmationToken', length: 191 })
  confirmationToken: string;

  @Field(() => Int, { description: 'Example filed (placeholder)' })
  @Column('tinyint', { name: 'isActive', width: 1 })
  isActive: boolean;

  @Field(() => Int, { description: 'Example filed (placeholder)' })
  @Column('int', { name: 'paymentPlanId', nullable: true })
  paymentPlanId: number | null;

  @Field(() => Int, { description: 'Example filed (placeholder)' })
  @Column('int', { name: 'packId', nullable: true })
  packId: number | null;

  @Field(() => Pack, { description: 'Example filed (placeholder)' })
  @ManyToOne(() => Pack, (pack) => pack.payments, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'packId', referencedColumnName: 'id' }])
  pack: Pack;


  @Field(() => Paymentplan, { description: 'Example filed (placeholder)' })
  @ManyToOne(() => Paymentplan, (paymentplan) => paymentplan.payments, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'paymentPlanId', referencedColumnName: 'id' }])
  paymentPlan: Paymentplan;
}
