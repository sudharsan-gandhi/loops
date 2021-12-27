import {
  Field, Float,
  GraphQLTimestamp, ID, Int, ObjectType
} from '@nestjs/graphql';
import { Payments } from 'src/_entities/payment.entity';
import { User } from 'src/_entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany, PrimaryGeneratedColumn
} from 'typeorm';

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

  @Field(() => User, { description: 'Example field (placeholder)' })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'postedBy', referencedColumnName: 'postedBy' })
  postedBy: User;

  @Field(() => [Payments], { description: 'Example field (placeholder)' })
  @OneToMany(() => Payments, (payments) => payments.paymentPlan)
  payments: Payments[];

  @Field(() => [User])
  @OneToMany(() => User, (user) => user.paymentPlan)
  users: User[];
}
