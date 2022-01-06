import {
  FilterableField
} from '@nestjs-query/query-graphql';
import {
  Field,
  GraphQLTimestamp,
  ID,
  InputType,
  Int
} from '@nestjs/graphql';
import { PaymentModel, PlanType } from 'src/_entities';

  
  @InputType()
  export class PaymentInputDTO {

    @Field(() => PlanType, {
      description: 'Example field (placeholder)',
    })
    type: PlanType;
  
    @FilterableField(() => Int, { description: 'Example filed (placeholder)' })
    price: number;
  
    @FilterableField(() => GraphQLTimestamp, {
      description: 'Example filed (placeholder)',
    })
    planStartDate: Date;
  
    @FilterableField(() => GraphQLTimestamp, {
      description: 'Example filed (placeholder)',
    })
    planEndDate: Date;
  
    @Field(() => PaymentModel, {
      description: `possible values are (${PaymentModel.MoPay}) and (${PaymentModel.PayPal})`,
    })
    paymentMode: PaymentModel;
  
    @Field({ description: 'Example filed (placeholder)' })
    confirmationToken: string;
  
    @FilterableField(() => Int, {
      description: 'Example filed (placeholder)',
      allowedComparisons: ['eq'],
    })
    isActive: boolean;
  
    @FilterableField(() => ID)
    packId: number;
  
    @FilterableField(() => ID)
    paymentPlanId: number;
  
    @FilterableField(() => ID)
    userId: number;
  }
  