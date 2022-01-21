import {
  Loop,
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

export const packInputVariables = (pack: MakeOptional<Pack, keyof Pack>) => {
  return {
    variables: {
      input: {
        pack,
      },
    },
  };
};

export const createAudio = gql`
  mutation CreateOneLoop($input: CreateOneLoopInput!) {
    createOneLoop(input: $input) {
      id
      name
      genre
      bpm
      path
      key
      audioType
      tempo
      packId
    }
  }
`;

export const loopInputVariables = (loop: MakeOptional<Loop, keyof Loop>) => {
  return {
    variables: {
      input: {
        loop,
      },
    },
  };
};
