import { gql } from '@apollo/client';

export const getAllPacksForHome = gql`
  query Packs(
    $paging: CursorPaging
    $audioPaging2: CursorPaging
    $sorting: [loopSort!]
    $filter: loopFilter
    $packsFilter2: packFilter
  ) {
    packs(paging: $paging, filter: $packsFilter2) {
      edges {
        node {
          id
          name
          price
          description
          type
          isLoop
          authorId
          author {
            name
            email
            image
          }
          audio(paging: $audioPaging2, sorting: $sorting, filter: $filter) {
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

export const getAllPacksForHomeVariables = () => {
  return {
    variables: {
      paging: {
        first: 100,
      },
      audioPaging2: {
        first: 1,
      },
      // packsFilter2: {
      //   isLoop: {
      //     isNot: true,
      //   },
      // },
    },
  };
};
