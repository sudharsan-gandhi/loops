import {
  MakeOptional,
  Pack,
} from 'queries';

import { gql } from '@apollo/client';

export const createPack = gql`
  mutation CreateOnePack($input: CreateOnePackInput!) {
    createOnePack(input: $input) {
      id
      name
      price
      type
    }
  }
`;

export const audioInputVariables = (pack: MakeOptional<Pack, keyof Pack>) => {
  return {
    variables: {
      input: {
        pack,
      },
    },
  };
};
