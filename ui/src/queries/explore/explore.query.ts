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


export const exploreLoops = gql`query Edges($paging: CursorPaging, $filter: loopFilter, $sorting: [loopSort!]) {
  loops(paging: $paging, filter: $filter, sorting: $sorting) {
    edges {
      node {
        id
        name
        genre
        path
        bpm
        audioType
        key
        tempo
        pack {
          id
          name
          description
          price
          type
          isLoop
          author {
            id
            name
            image
          }
        }
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}`
