import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Job } from 'src/_entities/job.entity';
import { Pack } from 'src/_entities/pack.entity';
import { Rave } from 'src/_entities/rave.entity';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Payment } from '.';

@ObjectType()
@Index('User_email_key', ['email'], { unique: true })
@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  @Field(() => Int, { description: 'Example field (1)' })
  id: number;

  @Column('varchar', {
    name: 'email',
    nullable: true,
    unique: true,
    length: 191,
  })
  @Field(() => Int, { description: 'Example field (1)' })
  email: string | null;

  @Column('datetime', { name: 'emailVerified', nullable: true })
  @Field(() => Int, { description: 'Example field (1)' })
  emailVerified: Date | null;

  @Column('varchar', { name: 'image', nullable: true, length: 191 })
  @Field(() => Int, { description: 'Example field (1)' })
  image: string | null;

  @Column('varchar', { name: 'name', nullable: true, length: 191 })
  @Field(() => Int, { description: 'Example field (1)' })
  name: string | null;

  @Column('mediumtext', { name: 'about', nullable: true })
  @Field(() => Int, { description: 'Example field (1)' })
  about: string | null;

  // @OneToMany(() => Account, (account) => account.user)
  // @Field(() => Int, { description: 'Example field (1)' })
  // accounts: Account[];

  @OneToMany(() => Job, (job) => job.postedBy)
  @Field(() => [Job], { description: 'Example field (1)' })
  jobs: Job[];

  @OneToMany(() => Pack, (pack) => pack.author)
  @Field(() => Int, { description: 'Example field (1)' })
  packs: Pack[];

  @OneToMany(() => Rave, (rave) => rave.follower)
  @Field(() => [User], { description: 'Example field (1)' })
  followers: Rave[];

  @OneToMany(() => Rave, (rave) => rave.following)
  @Field(() => [User], { description: 'Example field (1)' })
  followings: Rave[];

  @Field(() => Payment, { description: 'Example field (1)' })
  @OneToMany(() => Payment, (Payment) => Payment.user)
  payments: Payment[];
}
