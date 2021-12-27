import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAudioInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
