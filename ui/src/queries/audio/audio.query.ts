import { CursorPaging } from 'queries';

import { gql } from '@apollo/client';

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
