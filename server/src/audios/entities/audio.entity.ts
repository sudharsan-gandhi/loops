import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pack } from 'src/packs/entities/pack.entity';

@ObjectType()
@Index('Audio_packId_fkey', ['packId'], {})
@Entity('audio', { schema: 'testing' })
export class Audio {
  @Field(() => ID, { description: 'Example field (placeholder)' })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Field(() => String, { description: 'Example field (placeholder)' })
  @Column('varchar', { name: 'name', length: 191 })
  name: string;

  @Field(() => Int, { description: 'Example field (placeholder)' })
  @Column('int', { name: 'packId' })
  packId: number;

  @Field(() => String, { description: 'Example field (placeholder)' })
  @Column('varchar', { name: 'genre', length: 191 })
  genre: string;

  @Field(() => Int, { description: 'Example field (placeholder)' })
  @Column('int', { name: 'bpm' })
  bpm: number;

  @Field(() => String, { description: 'Example field (placeholder)' })
  @Column('varchar', { name: 'path', length: 191 })
  path: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  @Column('enum', { name: 'audioType', enum: ['oneshot', 'loop'] })
  audioType: 'oneshot' | 'loop';

  @Field(() => String, { description: 'Example field (placeholder)' })
  @Column('char', { name: 'key', length: 2 })
  key: string;

  @Field(() => Int, { description: 'Example field (placeholder)' })
  @Column('int', { name: 'tempo' })
  tempo: number;

  @Field(() => Pack, { description: 'Example field (placeholder)' })
  @ManyToOne(() => Pack, (pack) => pack.audio, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'packId', referencedColumnName: 'id' }])
  pack: Pack;
}
