import { PacketType } from 'src/_entities';

import { FilterableField } from '@nestjs-query/query-graphql';
import {
  Field,
  Float,
  ID,
  InputType,
} from '@nestjs/graphql';

import { AudioInputDTO } from './';

@InputType()
export class PackInputDTO {
  @FilterableField(() => String, { description: 'Example field (placeholder)' })
  name: string;

  @Field(() => String)
  description: string;

  @FilterableField(() => Float, {
    description: 'Example field (placeholder)',
    nullable: true,
  })
  price?: number;

  @Field(() => PacketType, {
    description: 'Example field (placeholder)',
  })
  type: PacketType;

  @Field(() => ID, { nullable: true })
  authorId?: number;

  @Field(() => [AudioInputDTO], { nullable: 'itemsAndList' })
  audio?: AudioInputDTO[];
}