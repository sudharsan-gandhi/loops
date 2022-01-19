import { gql } from '@apollo/client';

export const JOBS = gql`
  query Jobs {
    jobs {
      edges {
        node {
          title
          description
        }
      }
    }
  }
`;