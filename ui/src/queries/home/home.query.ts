import { gql } from '@apollo/client';

export const getHomeData = gql`
  query Packs(
    $paging: CursorPaging
    $audioPaging2: CursorPaging
    $sorting: [loopSort!]
    $filter: loopFilter
    $packsFilter2: packFilter
    $carouselsPaging2: CursorPaging
    $carouselsFilter2: carouselFilter
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
    carousels(paging: $carouselsPaging2, filter: $carouselsFilter2) {
      edges {
        node {
          image
          packId
        }
      }
    }
  }
`;

export const getHomeDataVariables = () => {
  return {
    variables: {
      paging: {
        first: 100,
      },
      audioPaging2: {
        first: 1,
      },
      carouselsPaging2: {
        first: 5,
      },
      carouselsFilter2: {
        deletedAt: {
          is: null,
        },
      },
    },
  };
};
