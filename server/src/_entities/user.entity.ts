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
import { Field, GraphQLTimestamp, ID, ObjectType } from '@nestjs/graphql';
import { hash } from 'bcrypt';

@Index('User_email_key', ['email'], { unique: true })
@Entity('user')
@ObjectType('user')
@CursorConnection('jobs', () => Job, { disableRemove: true })
@CursorConnection('packs', () => Pack, { disableRemove: true })
@CursorConnection('followers', () => Rave, { disableRemove: true })
@CursorConnection('followings', () => Rave, { disableRemove: true })
@CursorConnection('payments', () => Payment, { disableRemove: true })
export class User extends BaseEntity {
  @IDField(() => ID)
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', {
    name: 'email',
    nullable: false,
    unique: true,
    length: 191,
  })
  @FilterableField()
  email: string | null;

  @Column('varchar', { name: 'password', nullable: false })
  @Field()
  password: string | null;

  @Column('datetime', { name: 'emailVerified', nullable: true })
  @Field(() => GraphQLTimestamp)
  emailVerified: Date | null;

  @Column('varchar', { name: 'image', nullable: true, length: 191 })
  @Field()
  image: string | null;

  @Column('varchar', { name: 'name', nullable: true, length: 191 })
  @FilterableField()
  name: string | null;

  @Column('mediumtext', { name: 'about', nullable: true })
  @Field()
  about: string | null;

  // @OneToMany(() => Account, (account) => account.user)

  // accounts: Account[];

  @OneToMany(() => Job, (job) => job.postedBy)
  jobs: Job[];

  @OneToMany(() => Pack, (pack) => pack.author)
  packs: Pack[];

  @OneToMany(() => Rave, (rave) => rave.follower)
  followers: Rave[];

  @OneToMany(() => Rave, (rave) => rave.following)
  followings: Rave[];

  @OneToMany(() => Payment, (Payment) => Payment.user)
  payments: Payment[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
