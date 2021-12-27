import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Pack } from 'src/_entities/pack.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum AudioType {
  oneshot = 'oneshot',
  loop = 'loop',
}

registerEnumType(AudioType, { name: 'AudioType' });

@ObjectType()
@Entity('audio')
export class Audio extends BaseEntity {
  @Field(() => ID, { description: 'Example field (placeholder)' })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Field(() => String, { description: 'Example field (placeholder)' })
  @Column('varchar', { name: 'name', length: 191 })
  name: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  @Column('varchar', { name: 'genre', length: 191 })
  genre: string;

  @Field(() => Int, { description: 'Example field (placeholder)' })
  @Column('int', { name: 'bpm' })
  bpm: number;

  @Field(() => String, { description: 'Example field (placeholder)' })
  @Column('varchar', { name: 'path', length: 191 })
  path: string;

  @Field(() => AudioType, { description: 'Example field (placeholder)' })
  @Column('enum', { name: 'audioType', enum: ['oneshot', 'loop'] })
  audioType: AudioType;

  @Field(() => String, { description: 'Example field (placeholder)' })
  @Column('char', { name: 'key', length: 2 })
  key: string;

  @Field(() => Int, { description: 'Example field (placeholder)' })
  @Column('int', { name: 'tempo' })
  tempo: number;

  @Field(() => Pack, { description: 'Example field (placeholder)' })
  @ManyToOne(() => Pack, (pack) => pack.audio, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  pack: Pack;
}
