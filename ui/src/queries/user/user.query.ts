import {
  CursorPaging,
  Scalars,
  SortDirection,
  UserFilter,
  UserSort,
  UserSortFields,
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
    sorting: UserSort[];
    filter: UserFilter;
  }
) => {
  const defaultOptions = {
    paging: {
      first: 1,
    },
    sorting: [
      {
        field: UserSortFields.PostDate,
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
