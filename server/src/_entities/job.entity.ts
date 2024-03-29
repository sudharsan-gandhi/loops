import { User } from 'src/_entities/user.entity';
import { JobAuthorizer } from 'src/resolver/authorizer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
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
  ObjectType,
} from '@nestjs/graphql';

@ObjectType('job')
@Entity('job')
@Relation('postedBy', () => User, { disableRemove: true })
@Authorize(JobAuthorizer)
export class Job extends BaseEntity {
  @IDField(() => ID, { description: 'Example field (placeholder)' })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @FilterableField({ description: 'Example field (placeholder)' })
  @Column('varchar', { name: 'title', length: 191, nullable: false })
  title: string;

  @Field({ description: 'Example field (placeholder)' })
  @Column('varchar', { name: 'description', length: 500})
  description: string;

  @FilterableField(() => GraphQLTimestamp, {
    description: 'Example field (placeholder)',
  })


  @FilterableField(() => GraphQLTimestamp, {
    description: 'Example field (placeholder)',
  })
  @Column('datetime', { name: 'expirationDate' })
  expirationDate: Date;

  @Column('varchar', { name: 'contact', length: '50', nullable: false })
  @Field()
  contact: string;

  @Column('varchar', { name: 'location', length: '50', nullable: false })
  @FilterableField()
  location: string;

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

  @ManyToOne(() => User, (user) => user.jobs, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  postedBy: User;

  @DeleteDateColumn()
  @FilterableField(() => GraphQLTimestamp, {defaultValue: null, nullable: true})
  deletedAt?: Date;
}
