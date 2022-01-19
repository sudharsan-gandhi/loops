import {
  MakeOptional,
  User,
} from 'queries/model';

import { gql } from '@apollo/client';

export const signupUser = gql`
    mutation CreateOneUser($input: CreateOneUserInput!) {
      createOneUser(input: $input) {
        id
        email
        image
        name
        about
        authorizer
        role
      }
    }`;
  
  export const signupVariables = (user: MakeOptional<User, keyof User>) => {
    return {
      variables: {
        input: {
          user,
        },
      },
    };
  };
  