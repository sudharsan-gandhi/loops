import { Job } from 'src/_entities/job.entity';
import { Pack } from 'src/_entities/pack.entity';
import { Rave } from 'src/_entities/rave.entity';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Payment } from '.';
import {
  CursorConnection,
  FilterableField,
  IDField,
  Relation,
} from '@nestjs-query/query-graphql';
import {
  Field,
  GraphQLTimestamp,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { hash } from 'bcrypt';
import { GraphQLBoolean } from 'graphql';
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
  @Field()
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

  @BeforeInsert()
  async hashPassword() {
    if (this.authorizer === Authorizer.LOCAL) {
      this.password = await hash(this.password, 10);
    }
  }
}
