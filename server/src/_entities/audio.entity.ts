import { Pack } from 'src/_entities/pack.entity';
import { AudioAuthorizer } from 'src/resolver/authorizer/audio.authorizer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import {
  Authorize,
  FilterableField,
  FilterableRelation,
  IDField,
} from '@nestjs-query/query-graphql';
import {
  Field,
  GraphQLTimestamp,
  ID,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

export enum AudioType {
  oneshot = 'oneshot',
  loop = 'loop',
}

registerEnumType(AudioType, { name: 'AudioType' });

@ObjectType('loop')
@Entity('audio')
@FilterableRelation('pack', () => Pack, { disableRemove: true })
@Authorize(AudioAuthorizer)
export class Loop extends BaseEntity {
  @IDField(() => ID, { description: 'Example field (placeholder)' })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @FilterableField({ description: 'Example field (placeholder)' })
  @Column('varchar', { name: 'name', length: 191 })
  name: string;

  @FilterableField({ description: 'Example field (placeholder)' })
  @Column('varchar', { name: 'genre', length: 191 })
  genre: string;

  @FilterableField(() => Int, { description: 'Example field (placeholder)' })
  @Column('int', { name: 'bpm' })
  bpm: number;

  @Field({ description: 'Example field (placeholder)' })
  @Column('varchar', { name: 'path', length: 191 })
  path: string;

  @FilterableField(() => AudioType, {
    description: 'Example field (placeholder)',
  })
  @Column('enum', { name: 'audioType', enum: ['oneshot', 'loop'] })
  audioType: AudioType;

  @FilterableField({ description: 'Example field (placeholder)' })
  @Column('char', { name: 'key', length: 2, nullable: true, default: '' })
  key?: string;

  @FilterableField(() => Int, { description: 'Example field (placeholder)' })
  @Column('int', { name: 'tempo' })
  tempo: number;

  @FilterableField(() => ID)
  @Column('int')
  packId: number;

  @ManyToOne(() => Pack, (pack) => pack.audio, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  pack: Pack;

  @FilterableField(() => GraphQLTimestamp, {
    description: 'Example field (placeholder)',
  })
  @Column('datetime', {
    name: 'postDate',
  })
  @CreateDateColumn()
  postDate: Date;

  @FilterableField(() => GraphQLTimestamp, {
    description: 'Example field (placeholder)',
  })
  @Column('datetime', { name: 'updatedAt' })
  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  @FilterableField(() => GraphQLTimestamp, {defaultValue: null, nullable: true})
  deletedAt?: Date;
}
