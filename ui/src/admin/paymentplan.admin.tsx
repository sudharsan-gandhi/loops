import { useState } from 'react';

import {
  KBFilterInterface,
  KBSortInterface,
} from 'components/pagination';
import { reducer } from 'components/pagination/paginate.reducer';
import {
  PaymentplanFilter,
  PaymentplanSortFields,
  QueryUsersArgs,
  UserConnection,
} from 'queries';

import AdminQueries, {
  MutationField,
  ViewField,
} from './@query.admin';
import ValidationHelper from './@validation.admin';
import Resource, { useAdminViewData } from './_.admin';

const PaymentplanResource: React.FC = () => {
  const resource = "Paymentplan";
  const viewFields: ViewField[] = [
    { field: "id", type: "string" },
    { field: "title", type: "string" },
    { field: "description", type: "string" },
    { field: "amount", type: "number" },
    { field: "month", type: "number" },
    { field: "isActive", type: "boolean" },
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
      field: "amount",
      type: "number",
      isRequired: true,
      validations: { ...ValidationHelper.min(2), ...ValidationHelper.max(200) },
    },
    {
      field: "month",
      label: "Plan Duration(in months)",
      type: "number",
      isRequired: true,
      validations: { ...ValidationHelper.min(3), ...ValidationHelper.max(36) },
    },
    { field: "isActive", type: "checkbox", isRequired: true, validations: {} },
    {
      field: "postedById",
      label: "User Id",
      type: "string",
      isRequired: true,
      validations: {},
    },

    // {
    //   field: "password",
    //   type: "password",
    //   isRequired: true,
    //   validations: { ...ValidationHelper.passwordPattern() },
    // },
  ];

  const searchFields: KBFilterInterface<
    Omit<PaymentplanFilter, "or" | "and">
  >[] = [
    { key: "id", label: "Id" },
    { key: "title", label: "Title" },
    { key: "amount", label: "Amount", type: "number" },
    { key: "postDate", label: "Posted Date", type: "date" },
    { key: "isActive", label: "Active", type: "checkbox" },
    { key: "postDate", label: "Created Date", type: "date" },
    { key: "postedById", label: "User Id" },
  ];

  const sortFields: KBSortInterface<PaymentplanSortFields>[] = [
    { key: PaymentplanSortFields.Id, label: "Id" },
    { key: PaymentplanSortFields.Title, label: "Title" },
    { key: PaymentplanSortFields.Amount, label: "Amount" },
    { key: PaymentplanSortFields.IsActive, label: "Active" },
    { key: PaymentplanSortFields.PostDate, label: "Posted Date" },
    { key: PaymentplanSortFields.PostedById, label: "User ID" },
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

export default PaymentplanResource;
