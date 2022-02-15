import { gql } from '@apollo/client';

export const JOBS = gql`
  query Edges($paging: CursorPaging, $filter: jobFilter, $sorting: [jobSort!]) {
    jobs(paging: $paging, filter: $filter, sorting: $sorting) {
      edges {
        node {
          id
          title
          description
          expirationDate
          contact
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }`;
