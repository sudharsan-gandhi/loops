import { FilterableField } from '@nestjs-query/query-graphql';
import { Field, Float, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PaymentplanInputDTO {
  @Field({ description: 'Example field (placeholder)' })
  title: string;

  @Field({ description: 'Example field (placeholder)' })
  description: string;

  @FilterableField(() => Float, { description: 'Example field (placeholder)' })
  amount: number;

  @Field(() => Int, { description: 'Example field (placeholder)' })
  month: number;

  @FilterableField(() => ID)
  postedById: number;
}
