import { FilterableField } from '@nestjs-query/query-graphql';
import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { PacketType } from 'src/_entities';

@InputType()
export class PackInputDTO {
  @FilterableField(() => String, { description: 'Example field (placeholder)' })
  name: string | null;

  @FilterableField(() => Float, { description: 'Example field (placeholder)' })
  price: number;

  @Field(() => PacketType, {
    description: 'Example field (placeholder)',
  })
  type: PacketType;

  @Field(() => ID)
  authorId: number;
}
