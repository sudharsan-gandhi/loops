import {
  Field, Float,
  GraphQLTimestamp, ID, Int, ObjectType
} from '@nestjs/graphql';
import { Payment } from 'src/_entities/payment.entity';
import { User } from 'src/_entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity, ManyToOne,
  OneToMany, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';

@ObjectType()
@Entity('paymentplan')
export class Paymentplan extends BaseEntity {
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
  })
  @CreateDateColumn()
  postDate: Date;

  @Field(() => GraphQLTimestamp, { description: 'Example field (placeholder)' })
  @Column('datetime', { name: 'updatedAt' })
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => User, { description: 'Example field (placeholder)' })
  @ManyToOne(() => User)
  postedBy: User;

  @Field(() => [Payment], { description: 'Example field (placeholder)' })
  @OneToMany(() => Payment, (payment) => payment.paymentPlan)
  payments: Payment[];
}
