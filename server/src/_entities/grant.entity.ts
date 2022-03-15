import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import {
  FilterableField,
  IDField,
} from '@nestjs-query/query-graphql';
import {
  GraphQLTimestamp,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

import { User } from './user.entity';

export enum GrantActions {
  createAny = 'create:any',
  createOwn = 'create:own',
  readAny = 'read:any',
  readOwn = 'read:own',
  updateAny = 'update:any',
  updateOwn = 'update:own',
  deleteAny = 'delete:any',
  deleteOwn = 'delete:own',
}

registerEnumType(GrantActions, { name: 'GrantActions' });

@ObjectType('grant')
@Entity('grant')
@Unique('role_resource_id', ['role', 'resource', 'action'])
export class Grant extends BaseEntity {
  @IDField(() => ID, { description: 'Example field (placeholder)' })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @FilterableField({ description: 'Example field (placeholder)' })
  @Column('varchar', { name: 'role', length: 30, nullable: false })
  role: string;

  @FilterableField({ description: 'Example field (placeholder)' })
  @Column('varchar', { name: 'resource', length: 30, nullable: false })
  resource: string;

  @FilterableField(() => GrantActions)
  @Column('enum', { name: 'action', enum: GrantActions })
  action: GrantActions;

  @FilterableField({
    description: `
    all attributes => ['*'],
    all attributes except specific fields => ['*', '!id']
    only selected attributes => ['id', 'name']
    `,
  })
  @Column('varchar', { name: 'attributes', length: 30, nullable: false })
  attributes: string;

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

  @DeleteDateColumn()
  @FilterableField(() => GraphQLTimestamp, {defaultValue: null, nullable: true})
  deletedAt?: Date;

  @FilterableField(() => ID)
  @Column('int')
  postedById: number;

  @ManyToOne(() => User, (user) => user.jobs, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  postedBy: User;

}
