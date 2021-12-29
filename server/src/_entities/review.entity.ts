import { Field, Int, ObjectType } from '@nestjs/graphql';

// @ObjectType()
export class Review {
  // @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
