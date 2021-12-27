import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePackInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
