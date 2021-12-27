import {
  ObjectType,
  Field,
  Int,
  ID,
  Float,
  registerEnumType,
  ResolveProperty,
} from '@nestjs/graphql';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Audio } from 'src/audios/entities/audio.entity';
import { User } from 'src/users/entities/user.entity';
import { Payments } from 'src/payments/entities/payment.entity';

export enum PacketType {
  FREE,
  PAID,
}

registerEnumType(PacketType, { name: 'PacketType' });

@ObjectType()
@Index('Pack_authorId_fkey', ['authorId'], {})
@Entity('pack', { schema: 'testing' })
export class Pack {
  @Field(() => ID, { description: 'Example field (placeholder)' })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Field(() => String, { description: 'Example field (placeholder)' })
  @Column('varchar', { name: 'name', nullable: true, length: 191 })
  name: string | null;

  @Field(() => Int, { description: 'Example field (placeholder)' })
  @Column('int', { name: 'authorId' })
  authorId: number;

  @Field(() => Float, { description: 'Example field (placeholder)' })
  @Column('int', { name: 'price' })
  price: number;

  @Field(() => PacketType, { description: 'Example field (placeholder)' })
  @Column('enum', { name: 'type', enum: ['FREE', 'PAID'] })
  type: 'FREE' | 'PAID';

  @Field(() => [Audio], { description: 'Example field (placeholder)' })
  @OneToMany(() => Audio, (audio) => audio.pack)
  audio: Audio[];

  @ManyToOne(() => User, (user) => user.packs, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'authorId', referencedColumnName: 'id' }])
  author: User;

  @OneToMany(() => Payments, (payments) => payments.pack)
  payments: Payments[];
}
