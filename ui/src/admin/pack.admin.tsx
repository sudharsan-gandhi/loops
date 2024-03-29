import { useState } from 'react';

import {
  KBFilterInterface,
  KBSortInterface,
} from 'components/pagination';
import { reducer } from 'components/pagination/paginate.reducer';
import {
  PackFilter,
  PackSortFields,
  QueryUsersArgs,
  UserConnection,
} from 'queries';
import { packValidations } from 'validations/pack.validation';

import AdminQueries, {
  MutationField,
  ViewField,
} from './@query.admin';
import Resource, { useAdminViewData } from './_.admin';

const PackResource: React.FC = () => {
  const resource = "Pack";
  const viewFields: ViewField[] = [
    { field: "id", type: "string" },
    { field: "name", type: "string" },
    { field: "price", type: "number" },
    { field: "description", type: "string" },
    { field: "type", type: "string" },
    { field: "isLoop", type: "boolean" },
    { field: "authorId", type: "string" },
    { field: "postDate", type: "date" },
    { field: "updatedAt", type: "date" },
  ];

  const mutationFields: MutationField[] = [
    {
      field: "name",
      type: "string",
      isRequired: true,
      validations: {
        ...packValidations.name.minlength,
        ...packValidations.name.maxLength,
      },
    },
    {
      field: "description",
      type: "string",
      isRequired: true,
      validations: { ...packValidations.description.maxLength },
    },
    {
      field: "type",
      type: "select",
      options: [
        { label: "FREE", value: "FREE" },
        { label: "PAID", value: "PAID" },
      ],
      isRequired: true,
      validations: {},
    },
    {
      field: "price",
      type: "number",
      isRequired: false,
      validations: {
        ...packValidations.price.min,
        ...packValidations.price.max,
      },
    },
    { field: "isLoop", type: "checkbox", isRequired: true, validations: {} },
    {
      field: "authorId",
      label: "User ID",
      type: "ref",
      isRequired: true,
      refFn: (user, _) => {
        return user.id;
      },
      validations: {},
    },
  ];

  const searchFields: KBFilterInterface<Omit<PackFilter, "or" | "and">>[] = [
    { key: "id", label: "ID" },
    { key: "name", label: "Pack Name" },
    { key: "price", label: "Price", type: "number" },
    { key: "isLoop", label: "is Audio pack?", type: "checkbox" },
    { key: "type", label: "Type", type: "select", options: ["FREE", "PAID"] },
    { key: "postDate", label: "Created Date", type: "date" },
    { key: "authorId", label: "Pack Owner" },
  ];

  const sortFields: KBSortInterface<PackSortFields>[] = [
    { key: PackSortFields.Id, label: "Id" },
    { key: PackSortFields.Name, label: "Name" },
    { key: PackSortFields.Price, label: "Price" },
    { key: PackSortFields.Type, label: "Pack Type" },
    { key: PackSortFields.PostDate, label: "Posted Date" },
    { key: PackSortFields.AuthorId, label: "User ID" },
  ];

  const { viewData } = useAdminViewData();

  const initialVariables: QueryUsersArgs =
    AdminQueries.initialVariables() as QueryUsersArgs;

  const [variables, dispatch] = useState({
    ...initialVariables,
  });

  const formReducer = (form: any) => {
    let newState = {
      paging: {},
    };
    if (form.type === "clear") {
      dispatch({ ...initialVariables });
      return;
    }
    if (form?.paging?.first || variables?.paging?.first) {
      newState = {
        paging: {
          first: form?.paging?.first
            ? parseInt(form.paging.first)
            : variables.paging.first,
        },
      };
    }
    Object.entries(form).forEach(([key, value]) => {
      Object.entries(value).forEach(([k, v]) => {
        if (v) {
          newState = reducer<QueryUsersArgs>(
            newState,
            (viewData as unknown as UserConnection)?.pageInfo,
            {
              type: key as keyof QueryUsersArgs | "clear",
              key: k,
              value: v,
            },
            initialVariables
          );
        }
      });
    });
    delete variables.paging;
    newState = {
      ...variables,
      ...newState,
    };
    // add default filters here
    dispatch({ ...newState });
  };

  return (
    <Resource
      resource={resource}
      searchFields={searchFields}
      sortFields={sortFields}
      viewFields={viewFields}
      mutationFields={mutationFields}
      formReducer={formReducer}
      variables={variables}
    />
  );
};

export default PackResource;
