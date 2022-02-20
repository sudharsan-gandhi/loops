import { AudioType } from 'src/_entities';

import { FilterableField } from '@nestjs-query/query-graphql';
import {
  Field,
  ID,
  InputType,
  Int,
} from '@nestjs/graphql';

@InputType()
export class AudioInputDTO {
  @FilterableField({ description: 'Example field (placeholder)' })
  name: string;

  @FilterableField({ description: 'Example field (placeholder)' })
  genre: string;

  @FilterableField(() => Int, { description: 'Example field (placeholder)' })
  bpm: number;

  @Field({ description: 'Example field (placeholder)' })
  path: string;

  @Field(() => AudioType, {
    description: 'Example field (placeholder)',
  })
  audioType: AudioType;

  @FilterableField({
    description: 'Example field (placeholder)',
    nullable: true,
  })
  key?: string;

  @FilterableField(() => Int, { description: 'Example field (placeholder)' })
  tempo: number;

  @FilterableField(() => ID)
  packId: number;

}

@InputType()
export class AudioUpdateDTO {
  @FilterableField({
    description: 'Example field (placeholder)',
    nullable: true,
  })
  name?: string;

  @FilterableField({
    description: 'Example field (placeholder)',
    nullable: true,
  })
  genre?: string;

  @FilterableField(() => Int, {
    description: 'Example field (placeholder)',
    nullable: true,
  })
  bpm?: number;

  @Field({ description: 'Example field (placeholder)', nullable: true })
  path?: string;

  @Field(() => AudioType, {
    description: 'Example field (placeholder)',
    nullable: true,
  })
  audioType?: AudioType;

  @FilterableField({
    description: 'Example field (placeholder)',
    nullable: true,
  })
  key?: string;

  @FilterableField(() => Int, {
    description: 'Example field (placeholder)',
    nullable: true,
  })
  tempo?: number;

  @FilterableField(() => ID, { nullable: true })
  packId?: number;
}
