import { Test, TestingModule } from '@nestjs/testing';
import { PaymentPlansResolver } from './payment-plans.resolver';
import { PaymentPlansService } from './payment-plans.service';

describe('PaymentPlansResolver', () => {
  let resolver: PaymentPlansResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentPlansResolver, PaymentPlansService],
    }).compile();

    resolver = module.get<PaymentPlansResolver>(PaymentPlansResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
