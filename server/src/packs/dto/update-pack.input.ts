import { CreatePackInput } from './create-pack.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePackInput extends PartialType(CreatePackInput) {
  @Field(() => Int)
  id: number;
}
