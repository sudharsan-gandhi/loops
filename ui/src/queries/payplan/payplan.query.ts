import { gql } from '@apollo/client';

export const getActivePayplans = gql`
  query Paymentplans($filter: paymentplanFilter) {
    paymentplans(filter: $filter) {
      edges {
        node {
          id
          description
          title
          amount
          month
        }
      }
    }
  }
`;

export const getActivePayplansVariables = () => {
  return {
    variables: {
      paymentplanId: null,
      filter: {
        isActive: {
          eq: true,
        },
      },
    },
  };
};
