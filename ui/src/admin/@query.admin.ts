import pluralize from 'pluralize';
import { RegisterOptions } from 'react-hook-form';

import { gql } from '@apollo/client';

export type ViewField = {
  field: string;
  type: "string" | "date" | "boolean" | "link" | "number";
  linkPrefix?: string;
  isImage?: boolean;
};

export type MutationField = {
  field: string;
  label?: string;
  type:
    | "string"
    | "date"
    | "checkbox"
    | "link"
    | "number"
    | "upload"
    | "select"
    | "radio"
    | "textarea"
    | "password";
  isRequired: boolean;
  validations: RegisterOptions;
  mimeType?: string;
  fileOptions?: {
    files: any;
    setFiles: any;
    uploadLink: string;
  };
  options?: { label: string; value: string | number }[] | (string | number)[];
};

const AdminQueries = {
  pagination: [5, 10, 20, 50],
  initialVariables: () => ({
    paging: {
      first: AdminQueries.pagination[0],
    },
    filter: {},
    sorting: [],
  }),
  getMany: (resource: string, fields: ViewField[]) => {
    return gql`
        query ExampleQuery(
          $paging: CursorPaging
          $filter: ${resource.toLowerCase()}Filter
          $sorting: [${resource.toLowerCase()}Sort!]
        ) {
          ${pluralize(
            resource.toLowerCase()
          )}(paging: $paging, filter: $filter, sorting: $sorting) {
            pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
            }
            edges {
              node {
                ${fields
                  .reduce((prev, curr) => {
                    return prev + "\n" + curr.field;
                  }, "")
                  .trim()}
              }
            }
          }
        }
      `;
  },
  deleteOne: (resource: string) => {
    return gql`
      mutation DeleteOne${resource}($input: DeleteOne${resource}Input!) {
        deleteOne${resource}(input: $input) {
          id
        }
      }`;
  },
  deleteMany: (resource: string) => {
    return gql`
      mutation DeleteMany${pluralize(resource)}(
        $input: DeleteMany${pluralize(resource)}Input!
        ) {
        deleteMany${pluralize(resource)}(input: $input) {
          deletedCount
        }
      }
  `;
  },

  deleteOneVariable: (id: string) => ({
    variables: {
      input: {
        id,
      },
    },
  }),
  deleteManyVariable: (input: string[]) => ({
    variables: {
      input: {
        filter: {
          id: {
            in: [...input],
          },
        },
      },
    },
  }),

  createOne: (resource: string) => {
    return gql`
    mutation CreateOne${resource}($input: CreateOne${resource}Input!) {
      createOne${resource}(input: $input) {
        id
      }
    }`;
  },

  updateOne: (resource: string) => {
    return gql`
      mutation UpdateOne${resource}($input: UpdateOne${resource}Input!) {
        updateOne${resource}(input: $input) {
          id
        }
      }
    `;
  },
};

export default AdminQueries;
