import {
  CursorConnection,
  FilterableField,
  IDField,
  Relation,
} from '@nestjs-query/query-graphql';
import {
  Field,
  Float,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Audio } from 'src/_entities/audio.entity';
import { Payment } from 'src/_entities/payment.entity';
import { User } from 'src/_entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Review } from './review.entity';

export enum PacketType {
  FREE = 'FREE',
  PAID = 'PAID',
}

registerEnumType(PacketType, { name: 'PacketType' });

@ObjectType('pack')
@Entity('pack')
@Relation('author', () => User, { disableRemove: true })
@CursorConnection('audio', () => Audio, { disableRemove: true })
@CursorConnection('payments', () => Payment, { disableRemove: true })
@CursorConnection('reviews', () => Payment, { disableRemove: true })
export class Pack extends BaseEntity {
  @IDField(() => ID, { description: 'Example field (placeholder)' })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @FilterableField(() => String, { description: 'Example field (placeholder)' })
  @Column('varchar', { name: 'name', nullable: true, length: 191 })
  name: string | null;

  @FilterableField(() => Float, { description: 'Example field (placeholder)' })
  @Column('int', { name: 'price' })
  price: number;

  @Field(() => PacketType, {
    description: 'Example field (placeholder)',
  })
  @Column('enum', { name: 'packetType', enum: PacketType })
  type: PacketType;

  @OneToMany(() => Audio, (audio) => audio.pack)
  audio: Audio[];

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

  @FilterableField(() => ID)
  @Column('int')
  reviewId: number;

  @OneToMany(() => Review, (review) => review.pack)
  reviews: Review[];
}
