import { GraphQLBoolean } from 'graphql';
import { Loop } from 'src/_entities/audio.entity';
import { Payment } from 'src/_entities/payment.entity';
import { User } from 'src/_entities/user.entity';
import { PackAuthorizer } from 'src/resolver/authorizer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import {
  Authorize,
  CursorConnection,
  FilterableField,
  IDField,
  Relation,
} from '@nestjs-query/query-graphql';
import {
  Field,
  Float,
  GraphQLTimestamp,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

import { Carousel } from './carousel.entity';
import { Review } from './review.entity';

export enum PacketType {
  FREE = 'FREE',
  PAID = 'PAID',
}

registerEnumType(PacketType, { name: 'PacketType' });

@ObjectType('pack')
@Entity('pack')
@Relation('author', () => User, { disableRemove: true })
@CursorConnection('audio', () => Loop, { disableRemove: true })
@CursorConnection('payments', () => Payment, { disableRemove: true })
@CursorConnection('reviews', () => Review, { disableRemove: true })
@CursorConnection('carousels', () => Carousel, { disableRemove: true })
@Authorize(PackAuthorizer)
export class Pack extends BaseEntity {
  @IDField(() => ID, { description: 'Example field (placeholder)' })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @FilterableField(() => String, { description: 'Example field (placeholder)' })
  @Column('varchar', { name: 'name', nullable: true, length: 191 })
  name: string | null;

  @FilterableField(() => Float, {
    description: 'Example field (placeholder)',
    defaultValue: 0,
    nullable: true
  })
  @Column('int', { name: 'price', default: 0, nullable: true })
  price: number;

  @Field(() => String, { description: 'Example field (placeholder)' })
  @Column('varchar', { nullable: false, length: 200 })
  description: string;

  @FilterableField(() => PacketType, {
    description: 'Example field (placeholder)',
  })
  @Column('enum', { name: 'packetType', enum: PacketType })
  type: PacketType;

  @FilterableField(() => GraphQLBoolean)
  @Column('boolean', { default: false })
  isLoop: boolean;

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

  @OneToMany(() => Loop, (audio) => audio.pack)
  audio: Loop[];

  @FilterableField(() => ID)
  @Column('int')
  authorId: number;

  @ManyToOne(() => User, (user) => user.packs, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  author: User;

  @OneToMany(() => Payment, (payment) => payment.pack)
  payments: Payment[];

  @OneToMany(() => Review, (review) => review.pack)
  reviews: Review[];

  @OneToMany(() => Carousel, (carousel) => carousel.pack)
  carousels: Carousel[];
  
  @DeleteDateColumn()
  @FilterableField(() => GraphQLTimestamp, {defaultValue: null, nullable: true})
  deletedAt?: Date;
}
