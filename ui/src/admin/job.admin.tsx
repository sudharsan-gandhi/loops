import { useState } from 'react';

import {
  KBFilterInterface,
  KBSortInterface,
} from 'components/pagination';
import { reducer } from 'components/pagination/paginate.reducer';
import {
  JobFilter,
  JobSortFields,
  QueryUsersArgs,
  UserConnection,
} from 'queries';

import AdminQueries, {
  MutationField,
  ViewField,
} from './@query.admin';
import Resource, { useAdminViewData } from './_.admin';

const JobResource: React.FC = () => {
  const resource = "Job";
  const viewFields: ViewField[] = [
    { field: "id", type: "string" },
    { field: "title", type: "string" },
    { field: "description", type: "string" },
    { field: "expirationDate", type: "date" },
    { field: "contact", type: "string" },
    { field: "location", type: "string" },
    { field: "postDate", type: "date" },
    { field: "updatedAt", type: "date" },
    { field: "postedById", type: "string" },
  ];

  const mutationFields: MutationField[] = [
    { field: "title", type: "string", isRequired: true, validations: {} },
    {
      field: "description",
      type: "textarea",
      isRequired: true,
      validations: {},
    },
    {
      field: "expirationDate",
      label: "Expiration Date",
      isRequired: true,
      type: "date",
      validations: {},
    },
    { field: "contact", type: "string", isRequired: true, validations: {} },
    { field: "location", type: "string", isRequired: true, validations: {} },
    {
      field: "postedById",
      label: "User Id",
      type: "ref",
      isRequired: true,
      validations: {},
      refFn: (user, _) => {
        return user.id;
      },
    },

    // {
    //   field: "password",
    //   type: "password",
    //   isRequired: true,
    //   validations: { ...ValidationHelper.passwordPattern() },
    // },
  ];

  const searchFields: KBFilterInterface<Omit<JobFilter, "or" | "and">>[] = [
    { key: "id", label: "Id" },
    { key: "title", label: "Title" },
    { key: "expirationDate", label: "Expiration Date", type: "date" },
    { key: "location", label: "Job Location" },
    { key: "postDate", label: "Created Date", type: "date" },
    { key: "postedById", label: "User Id" },
  ];

  const sortFields: KBSortInterface<JobSortFields>[] = [
    { key: JobSortFields.Id, label: "Id" },
    { key: JobSortFields.Title, label: "Title" },
    { key: JobSortFields.ExpirationDate, label: "Expiration Date" },
    { key: JobSortFields.Location, label: "Job Location" },
    { key: JobSortFields.PostDate, label: "Created Date" },
  ];

  const { viewData } = useAdminViewData();

  const initialVariables: QueryUsersArgs =
    AdminQueries.initialVariables() as QueryUsersArgs;

  const [variables, dispatch] = useState({
    ...initialVariables,
  });

  const formReducer = (form: any) => {
    if (form?.paging?.first) {
      form.paging.first = parseInt(form.paging.first);
    }
    let newState: QueryUsersArgs = {
      paging: { ...variables.paging, ...(form.paging || {}) },
    };
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
    // add default filters here
    dispatch({
      filter: {
        ...(newState.filter || {}),
      },
      paging: {
        ...(newState.paging || {}),
      },
      sorting: [...(newState.sorting || [])],
    });
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

export default JobResource;
