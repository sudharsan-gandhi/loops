import { FilterableField } from '@nestjs-query/query-graphql';
import { Field, InputType } from '@nestjs/graphql';
import { GraphQLBoolean } from 'graphql';
import { Authorizer } from 'src/_entities';

@InputType()
export class UserInputDTO {
  @FilterableField()
  email: string | null;

  @Field()
  password?: string | null;

  @Field(() => GraphQLBoolean, { nullable: true })
  emailVerified: boolean | null;

  @Field()
  image: string | null;

  @FilterableField()
  name: string | null;

  @Field()
  about?: string | null;

  @Field()
  role: string;
}

@InputType()
export class UserUpdateDTO {
  @FilterableField({nullable: true})
  email: string | null;

  @Field({nullable: true})
  password?: string | null;

  @Field(() => GraphQLBoolean, { nullable: true })
  emailVerified: boolean | null;

  @Field({nullable: true})
  image: string | null;

  @FilterableField({nullable: true})
  name: string | null;

  @Field({nullable: true})
  about?: string | null;

}

