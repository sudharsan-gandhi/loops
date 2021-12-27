import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/_entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';


@ObjectType()
@Index('Rave_followerId_followingId_key', ['followerId', 'followingId'], {
  unique: true,
})
@Index('Rave_followingId_fkey', ['followingId'], {})
@Entity('rave', { schema: 'testing' })
export class Rave extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Field(() => Int, { description: 'Example field (placeholder)' })
  @Column('int', { name: 'followerId' })
  followerId: number;

  @Field(() => Int, { description: 'Example field (placeholder)' })
  @Column('int', { name: 'followingId' })
  followingId: number;

  @Field(() => User, { description: 'Example field (placeholder)' })
  @ManyToOne(() => User, (user) => user.followers, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'followerId', referencedColumnName: 'id' }])
  follower: User;

  @Field(() => User, { description: 'Example field (placeholder)' })
  @ManyToOne(() => User, (user) => user.followings, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'followingId', referencedColumnName: 'id' }])
  following: User;
}
