import { User } from 'src/_entities/user.entity';
import { RaveAuthorizer } from 'src/resolver/authorizer';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  Authorize,
  FilterableField,
  IDField,
  Relation,
} from '@nestjs-query/query-graphql';
import {
  ID,
  Int,
  ObjectType,
} from '@nestjs/graphql';

@ObjectType('rave')
@Index('Rave_followerId_followingId_key', ['followerId', 'followingId'], {
  unique: true,
})
@Index('Rave_followingId_fkey', ['followingId'], {})
@Entity('rave', { schema: 'testing' })
@Relation('follower', () => User, { disableRemove: true })
@Relation('following', () => User, { disableRemove: true })
@Authorize(RaveAuthorizer)
export class Rave extends BaseEntity {
  @IDField(() => ID)
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @FilterableField(() => Int, { description: 'Example field (placeholder)' })
  @Column('int', { name: 'followerId' })
  followerId: number;

  @FilterableField(() => Int, { description: 'Example field (placeholder)' })
  @Column('int', { name: 'followingId' })
  followingId: number;

  @ManyToOne(() => User, (user) => user.followers, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'followerId', referencedColumnName: 'id' }])
  follower: User;

  @ManyToOne(() => User, (user) => user.followings, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'followingId', referencedColumnName: 'id' }])
  following: User;
}
