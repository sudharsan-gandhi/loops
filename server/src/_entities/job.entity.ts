import {
  FilterableField,
  IDField,
  Relation,
} from '@nestjs-query/query-graphql';
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

@ObjectType('job')
@Entity('job')
@Relation('postedBy', () => User, { disableRemove: true })
export class Job extends BaseEntity {
  @IDField(() => ID, { description: 'Example field (placeholder)' })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @FilterableField({ description: 'Example field (placeholder)' })
  @Column('varchar', { name: 'title', length: 191 })
  title: string;

  @Field({ description: 'Example field (placeholder)' })
  @Column('mediumtext', { name: 'description' })
  description: string;

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
  @Column('datetime', { name: 'expirationDate' })
  expirationDate: Date;

  @UpdateDateColumn()
  @Field(() => GraphQLTimestamp, { description: 'Example field (placeholder)' })
  @Column('datetime', { name: 'updatedAt' })
  updatedAt: Date;

  @FilterableField(() => ID)
  @Column('int')
  postedById: number;

  @ManyToOne(() => User, (user) => user.jobs, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  postedBy: User;
}
