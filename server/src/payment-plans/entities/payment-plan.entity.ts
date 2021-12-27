import {
  ObjectType,
  Field,
  Int,
  ID,
  Float,
  GraphQLTimestamp,
} from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Payments } from 'src/payments/entities/payment.entity';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
@Entity('paymentplan', { schema: 'testing' })
export class Paymentplan {
  @Field(() => ID, { description: 'Example field (placeholder)' })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Field({ description: 'Example field (placeholder)' })
  @Column('varchar', { name: 'title', length: 191 })
  title: string;

  @Field({ description: 'Example field (placeholder)' })
  @Column('varchar', { name: 'description', length: 191 })
  description: string;

  @Field(() => Float, { description: 'Example field (placeholder)' })
  @Column('int', { name: 'amount' })
  amount: number;

  @Field(() => Int, { description: 'Example field (placeholder)' })
  @Column('int', { name: 'month' })
  month: number;

  @Field(() => GraphQLTimestamp, { description: 'Example field (placeholder)' })
  @Column('datetime', {
    name: 'postDate',
    default: () => "'CURRENT_TIMESTAMP(3)'",
  })
  postDate: Date;

  @Field(() => GraphQLTimestamp, { description: 'Example field (placeholder)' })
  @Column('datetime', { name: 'updatedAt' })
  updatedAt: Date;

  @Field(() => Int, { description: 'Example field (placeholder)' })
  @Column('int', { name: 'postedBy' })
  postedBy: number;

  @Field(() => [Payments], { description: 'Example field (placeholder)' })
  @OneToMany(() => Payments, (payments) => payments.paymentPlan)
  payments: Payments[];

  @Field(() => [User])
  @OneToMany(() => User, (user) => user.paymentPlan)
  users: User[];
}
