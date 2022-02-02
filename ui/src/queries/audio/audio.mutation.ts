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

export const updateOnePack = gql`
  mutation UpdateOnePack($input: UpdateOnePackInput!) {
    updateOnePack(input: $input) {
      id
      name
      description
      price
      type
    }
  }
`;

export const updateOnePackVariables = (
  oldPack: MakeOptional<Pack, keyof Pack>
) => {
  const { id, __typename, audio, author, reviews, payments, ...update } =
    oldPack;
  return {
    variables: {
      input: {
        id,
        update,
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

export const updateOneAudio = gql`
  mutation UpdateOneLoop($input: UpdateOneLoopInput!) {
    updateOneLoop(input: $input) {
      id
      name
      bpm
      genre
      path
      audioType
      key
      packId
      tempo
    }
  }
`;

export const updateOneLoopVariables = (
  oldPack: MakeOptional<Loop, keyof Loop>
) => {
  const { id, __typename, pack, ...update } = oldPack;
  return {
    variables: {
      input: {
        id,
        update,
      },
    },
  };
};

export const deleteOnePack = gql`
  mutation DeleteOnePack($input: DeleteOnePackInput!) {
    deleteOnePack(input: $input) {
      id
      name
    }
  }
`;

export const deleteOneLoop = gql`
  mutation DeleteOneLoop($input: DeleteOneLoopInput!) {
    deleteOneLoop(input: $input) {
      name
      id
    }
  }
`;

export const deleteOneVariable = (id) => {
  return {
    variables: {
      input: {
        id,
      },
    },
  };
};
