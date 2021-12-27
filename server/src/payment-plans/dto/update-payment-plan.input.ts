import { CreatePaymentPlanInput } from './create-payment-plan.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePaymentPlanInput extends PartialType(CreatePaymentPlanInput) {
  @Field(() => Int)
  id: number;
}
