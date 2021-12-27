import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PaymentPlansService } from './payment-plans.service';
import { Paymentplan as PaymentPlan } from './entities/payment-plan.entity';
import { CreatePaymentPlanInput } from './dto/create-payment-plan.input';
import { UpdatePaymentPlanInput } from './dto/update-payment-plan.input';

@Resolver(() => PaymentPlan)
export class PaymentPlansResolver {
  constructor(private readonly paymentPlansService: PaymentPlansService) {}

  @Mutation(() => PaymentPlan)
  createPaymentPlan(@Args('createPaymentPlanInput') createPaymentPlanInput: CreatePaymentPlanInput) {
    return this.paymentPlansService.create(createPaymentPlanInput);
  }

  @Query(() => [PaymentPlan], { name: 'paymentPlans' })
  findAll() {
    return this.paymentPlansService.findAll();
  }

  @Query(() => PaymentPlan, { name: 'paymentPlan' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.paymentPlansService.findOne(id);
  }

  @Mutation(() => PaymentPlan)
  updatePaymentPlan(@Args('updatePaymentPlanInput') updatePaymentPlanInput: UpdatePaymentPlanInput) {
    return this.paymentPlansService.update(updatePaymentPlanInput.id, updatePaymentPlanInput);
  }

  @Mutation(() => PaymentPlan)
  removePaymentPlan(@Args('id', { type: () => Int }) id: number) {
    return this.paymentPlansService.remove(id);
  }
}
