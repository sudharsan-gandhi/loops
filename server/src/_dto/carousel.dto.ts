import { FilterableField } from '@nestjs-query/query-graphql';
import {
  Field,
  ID,
  InputType,
} from '@nestjs/graphql';

@InputType()
export class CarouselInputDTO {
  @Field({ nullable: false })
  image: string;

  @FilterableField(() => ID)
  packId: number;

  @FilterableField(() => ID)
  authorId: number;
}
