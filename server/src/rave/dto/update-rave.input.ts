import { CreateRaveInput } from './create-rave.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRaveInput extends PartialType(CreateRaveInput) {
  @Field(() => Int)
  id: number;
}
