import { FilterableField } from '@nestjs-query/query-graphql';
import {
  Field,
  GraphQLTimestamp,
  ID,
  InputType,
} from '@nestjs/graphql';

@InputType()
export class JobInputDTO {
  @FilterableField({ description: 'Example field (placeholder)' })
  title: string;

  @Field({ description: 'Example field (placeholder)' })
  description: string;

  @FilterableField(() => GraphQLTimestamp, {
    description: 'Example field (placeholder)',
  })
  expirationDate: Date;

  @FilterableField()
  contact: string;

  @FilterableField()
  location: string;

  @FilterableField(() => ID)
  postedById: number;
}