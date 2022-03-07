import { hash } from 'bcrypt';
import { GraphQLBoolean } from 'graphql';
import { Job } from 'src/_entities/job.entity';
import { Pack } from 'src/_entities/pack.entity';
import { Rave } from 'src/_entities/rave.entity';
import { UserAuthorizer } from 'src/resolver/authorizer/user.authorizer';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import {
  Authorize,
  CursorConnection,
  FilterableField,
  IDField,
} from '@nestjs-query/query-graphql';
import {
  Field,
  GraphQLTimestamp,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

import { Payment } from './';
import { Review } from './review.entity';

export enum Authorizer {
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
  LOCAL = 'LOCAL',
}

registerEnumType(Authorizer, { name: 'Authorizer' });

@Index('User_email_key', ['email'], { unique: true })
@Entity('user')
@ObjectType('user')
@CursorConnection('jobs', () => Job, { disableRemove: true })
@CursorConnection('packs', () => Pack, { disableRemove: true })
@CursorConnection('followers', () => Rave, { disableRemove: true })
@CursorConnection('followings', () => Rave, { disableRemove: true })
@CursorConnection('payments', () => Payment, { disableRemove: true })
@CursorConnection('reviews', () => Review, { disableRemove: true })
@Authorize(UserAuthorizer)
export class User extends BaseEntity {
  @IDField(() => ID)
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id?: number;

  @Column('varchar', {
    name: 'email',
    nullable: false,
    unique: true,
    length: 191,
  })
  @FilterableField()
  email: string | null;

  @Column('varchar', { name: 'password', nullable: true })
  @Field()
  password?: string | null;

  @Column('boolean', { name: 'emailVerified', nullable: true, default: false })
  @Field(() => GraphQLBoolean, { nullable: true })
  emailVerified: boolean | null;

  @Column('varchar', { name: 'image', nullable: true, length: 191 })
  @Field({ nullable: true })
  image: string | null;

  @Column('varchar', { name: 'name', nullable: true, length: 191 })
  @FilterableField()
  name: string | null;

  @Column('mediumtext', { name: 'about', nullable: true })
  @Field()
  about?: string | null;

  @Column('enum', {
    name: 'authorizer',
    enum: Authorizer,
    nullable: true,
    default: Authorizer.LOCAL,
  })
  @Field(() => Authorizer)
  authorizer: Authorizer;

  @Column('varchar', {
    name: 'role',
    default: 'user',
  })
  @Field({defaultValue: 'user'})
  role: string;

  // @OneToMany(() => Account, (account) => account.user)

  // accounts: Account[];

  @OneToMany(() => Job, (job) => job.postedBy)
  jobs?: Job[];

  @OneToMany(() => Pack, (pack) => pack.author)
  packs?: Pack[];

  @OneToMany(() => Rave, (rave) => rave.follower)
  followers?: Rave[];

  @OneToMany(() => Rave, (rave) => rave.following)
  followings?: Rave[];

  @OneToMany(() => Payment, (Payment) => Payment.user)
  payments?: Payment[];

  @OneToMany(() => Review, (review) => review.user)
  reviews?: Review[];

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

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await hash(this.password, 10);
    }
  }
}
