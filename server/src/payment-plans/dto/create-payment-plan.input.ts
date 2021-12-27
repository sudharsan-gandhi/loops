import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePaymentPlanInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
