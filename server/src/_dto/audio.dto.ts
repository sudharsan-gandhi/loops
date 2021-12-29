import {
    FilterableField
} from '@nestjs-query/query-graphql';
import {
    Field,
    ID,
    InputType,
    Int
} from '@nestjs/graphql';
import { AudioType } from 'src/_entities';


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

  @FilterableField({ description: 'Example field (placeholder)' })
  key: string;

  @FilterableField(() => Int, { description: 'Example field (placeholder)' })
  tempo: number;

  @FilterableField(() => ID)
  packId: number;
}
