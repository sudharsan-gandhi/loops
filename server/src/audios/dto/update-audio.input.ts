import { CreateAudioInput } from './create-audio.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAudioInput extends PartialType(CreateAudioInput) {
  @Field(() => Int)
  id: number;
}
