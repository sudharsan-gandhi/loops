import {
  CursorPaging,
  InputMaybe,
  PackFilter,
  PackSort,
} from 'queries';

import { gql } from '@apollo/client';

export const getAllPacks = gql`
  query Packs($paging: CursorPaging, $filter: packFilter) {
    packs(paging: $paging, filter: $filter) {
      edges {
        node {
          id
          name
          price
          type
        }
      }
    }
  }
`;

export const getAllPacksVariables = (
  authorId: string,
  paging: CursorPaging = { first: 10 },
  filter: InputMaybe<PackFilter>,
  sorting: InputMaybe<Array<PackSort>>
) => {
  const author = {
    authorId: {
      eq: authorId,
    },
  };
  return {
    variables: {
      ...paging,
      filter: { ...author, ...filter },
      ...sorting,
    },
  };
};

export const getPackWithAudiosById = gql`
  query Pack($id: ID!, $paging: CursorPaging) {
    pack(id: $id) {
      id
      name
      description
      price
      type
      author {
        name
        email
        image
      }
      audio(paging: $paging) {
        edges {
          node {
            id
            name
            genre
            bpm
            path
            audioType
            key
            tempo
          }
        }
      }
    }
  }
`;

export const getPackWithAudiosByIdVariables = (
  id,
  paging: CursorPaging = { first: 30 }
) => {
  return {
    variables: {
      id,
      paging,
    },
  };
};
