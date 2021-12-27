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

export enum PacketType {
  FREE = 'FREE',
  PAID = 'PAID',
}

registerEnumType(PacketType, { name: 'PacketType' });

@ObjectType()
@Entity('pack')
export class Pack extends BaseEntity {
  @Field(() => ID, { description: 'Example field (placeholder)' })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Field(() => String, { description: 'Example field (placeholder)' })
  @Column('varchar', { name: 'name', nullable: true, length: 191 })
  name: string | null;

  @Field(() => Float, { description: 'Example field (placeholder)' })
  @Column('int', { name: 'price' })
  price: number;

  @Field(() => PacketType, { description: 'Example field (placeholder)' })
  @Column('enum', { name: 'PacketType', enum: PacketType })
  type: PacketType;

  @Field(() => [Audio], { description: 'Example field (placeholder)' })
  @OneToMany(() => Audio, (audio) => audio.pack)
  audio: Audio[];

  @ManyToOne(() => User, (user) => user.packs, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  author: User;

  @OneToMany(() => Payment, (payment) => payment.pack)
  payments: Payment[];
}
