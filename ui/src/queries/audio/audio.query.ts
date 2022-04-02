import { CursorPaging, Maybe, PackFilter, PackSort } from "queries";

import { gql } from "@apollo/client";

export const getAllPacks = gql`
  query Packs($paging: CursorPaging, $filter: packFilter) {
    packs(paging: $paging, filter: $filter) {
      edges {
        node {
          id
          name
          price
          type
          author {
            name
            id
          }
          audio {
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
                packId
              }
            }
          }
        }
      }
    }
  }
`;

export const getAllPacksVariables = (
  authorId: string,
  paging: CursorPaging = { first: 10 },
  filter: Maybe<PackFilter>,
  sorting: Maybe<Array<PackSort>>,
  isLoop: boolean = false
) => {
  const author = {
    authorId: {
      eq: authorId,
    },
  };
  let onlyPackOrLoop: Maybe<PackFilter> = {
    isLoop: {
      isNot: true,
    },
  };
  if (isLoop) {
    onlyPackOrLoop = {
      isLoop: {
        is: true,
      },
    };
  }

  return {
    variables: {
      ...paging,
      filter: { ...author, ...onlyPackOrLoop, ...filter },
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
      isLoop
      author {
        id
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
            deletedAt
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
