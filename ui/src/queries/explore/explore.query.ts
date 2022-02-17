import { gql } from '@apollo/client';

export const explorePacks = gql`
  query Packs(
    $paging: CursorPaging
    $filter: packFilter
    $sorting: [packSort!]
  ) {
    packs(paging: $paging, filter: $filter, sorting: $sorting) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          name
          price
          description
          type
          isLoop
          author {
            email
            image
            name
            role
            id
          }
        }
      }
    }
  }
`;
