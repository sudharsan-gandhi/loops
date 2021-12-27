import { Module } from '@nestjs/common';
import { PaymentPlansService } from './payment-plans.service';
import { PaymentPlansResolver } from './payment-plans.resolver';

@Module({
  providers: [PaymentPlansResolver, PaymentPlansService]
})
export class PaymentPlansModule {}
