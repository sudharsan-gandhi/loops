import { FilterableField } from '@nestjs-query/query-graphql';
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class ReviewInputDTO {

  @Field()
  review: string | null;

  @FilterableField(() => ID)
  userId: number;

  @FilterableField(() => ID)
  packId: number;

}
