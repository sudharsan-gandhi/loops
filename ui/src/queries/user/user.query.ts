import {
  CursorPaging,
  PaymentFilter,
  PaymentSort,
  PaymentSortFields,
  Scalars,
  SortDirection,
} from 'queries';

import { gql } from '@apollo/client';

export const getUserWithPayPlan = gql`
  query User(
    $userId: ID!
    $paging: CursorPaging
    $sorting: [paymentSort!]
    $filter: paymentFilter
  ) {
    user(id: $userId) {
      id
      email
      image
      name
      about
      role
      payments(paging: $paging, sorting: $sorting, filter: $filter) {
        edges {
          node {
            id
            type
            price
            planStartDate
            planEndDate
            paymentMode
            paymentPlan {
              title
            }
          }
        }
      }
    }
  }
`;

export const getUserWithPayPlanVariables = (
  userId: Scalars["ID"],
  options?: {
    paging: CursorPaging;
    sorting: PaymentSort[];
    filter: PaymentFilter;
  }
) => {
  const defaultOptions = {
    paging: {
      first: 1,
    },
    sorting: [
      {
        field: PaymentSortFields.Date,
        direction: SortDirection.Desc,
      },
    ],
    filter: {
      isActive: {
        eq: 1,
      },
    },
  };
  return {
    variables: {
      userId,
      ...defaultOptions,
      ...options,
    },
  };
};
