import { GraphQLBoolean } from 'graphql';

import { FilterableField } from '@nestjs-query/query-graphql';
import {
  Field,
  InputType,
} from '@nestjs/graphql';

@InputType()
export class UserInputDTO {
  @FilterableField()
  email: string | null;

  @Field()
  password?: string | null;

  @Field(() => GraphQLBoolean, { nullable: true })
  emailVerified: boolean | null;

  @Field({ nullable: true })
  image: string | null;

  @FilterableField()
  name: string | null;

  @Field({ nullable: true })
  about?: string | null;

  @Field({ defaultValue: 'user' })
  role: string;
}

@InputType()
export class UserUpdateDTO {
  @FilterableField({ nullable: true })
  email?: string | null;

  @Field({ nullable: true })
  password?: string | null;

  @Field(() => GraphQLBoolean, { nullable: true })
  emailVerified: boolean | null;

  @Field({ nullable: true })
  image?: string | null;

  @FilterableField({ nullable: true })
  name?: string | null;

  @Field({ nullable: true })
  about?: string | null;

  @Field({ defaultValue: 'user', nullable: true })
  role?: string;
}
