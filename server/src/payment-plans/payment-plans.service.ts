import { Injectable } from '@nestjs/common';
import { CreatePaymentPlanInput } from './dto/create-payment-plan.input';
import { UpdatePaymentPlanInput } from './dto/update-payment-plan.input';

@Injectable()
export class PaymentPlansService {
  create(createPaymentPlanInput: CreatePaymentPlanInput) {
    return 'This action adds a new paymentPlan';
  }

  findAll() {
    return `This action returns all paymentPlans`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentPlan`;
  }

  update(id: number, updatePaymentPlanInput: UpdatePaymentPlanInput) {
    return `This action updates a #${id} paymentPlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentPlan`;
  }
}
