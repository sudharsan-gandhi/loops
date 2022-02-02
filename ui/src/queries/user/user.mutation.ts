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
  }
`;

export const signupVariables = (user: MakeOptional<User, keyof User>) => {
  return {
    variables: {
      input: {
        user,
      },
    },
  };
};

export const updateOneUserVariables = (
  user: MakeOptional<User, keyof User>
) => {
  const { role, authorizer, id, __typename, ...update } = user;
  return {
    variables: {
      input: {
        id,
        update,
      },
    },
  };
};

export const updateOneUser = gql`
  mutation UpdateOneUser($input: UpdateOneUserInput!) {
    updateOneUser(input: $input) {
      id
      email
      image
      name
      about
      role
    }
  }
`;
