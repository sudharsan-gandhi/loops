import {
  FilterableField
} from '@nestjs-query/query-graphql';
import { InputType, Int } from '@nestjs/graphql';
 

@InputType()
export class RaveInputDTO {
  @FilterableField(() => Int, { description: 'Example field (placeholder)' })
  followerId: number;

  @FilterableField(() => Int, { description: 'Example field (placeholder)' })
  followingId: number;
}
