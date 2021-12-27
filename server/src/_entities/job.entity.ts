import { Field, GraphQLTimestamp, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/_entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('job')
export class Job extends BaseEntity {
  @Field(() => ID, { description: 'Example field (placeholder)' })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Field({ description: 'Example field (placeholder)' })
  @Column('varchar', { name: 'title', length: 191 })
  title: string;

  @Field({ description: 'Example field (placeholder)' })
  @Column('mediumtext', { name: 'description' })
  description: string;

  @Field(() => GraphQLTimestamp, { description: 'Example field (placeholder)' })
  @Column('datetime', {
    name: 'postDate',
  })
  @CreateDateColumn()
  postDate: Date;

  @Field(() => GraphQLTimestamp, { description: 'Example field (placeholder)' })
  @Column('datetime', { name: 'expirationDate' })
  expirationDate: Date;

  @UpdateDateColumn()
  @Field(() => GraphQLTimestamp, { description: 'Example field (placeholder)' })
  @Column('datetime', { name: 'updatedAt' })
  updatedAt: Date;

  @Field(() => User, { description: 'Example field (placeholder)' })
  @ManyToOne(() => User, (user) => user.jobs, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  postedBy: User;
}
