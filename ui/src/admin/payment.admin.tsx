import { useState } from 'react';

import {
  KBFilterInterface,
  KBSortInterface,
} from 'components/pagination';
import { reducer } from 'components/pagination/paginate.reducer';
import {
  PaymentFilter,
  PaymentSortFields,
  QueryUsersArgs,
  UserConnection,
} from 'queries';

import AdminQueries, {
  MutationField,
  ViewField,
} from './@query.admin';
import Resource, { useAdminViewData } from './_.admin';

const PaymentResource: React.FC = () => {
  const resource = "Payment";
  const viewFields: ViewField[] = [
    { field: "id", type: "string" },
    { field: "type", type: "string" },
    { field: "price", type: "number" },
    { field: "planStartDate", type: "date" },
    { field: "planEndDate", type: "date" },
    { field: "paymentMode", type: "string" },
    { field: "confirmationToken", type: "string" },
    { field: "isActive", type: "boolean" },
    { field: "packId", type: "string" },
    { field: "paymentPlanId", type: "string" },
    { field: "userId", type: "string" },
    { field: "postDate", type: "date" },
    { field: "updatedAt", type: "date" },
  ];

  const mutationFields: MutationField[] = [
    {
      field: "type",
      type: "select",
      options: [
        { label: "subscription", value: "subscription" },
        { label: "buy", value: "buying pack" },
      ],
      isRequired: true,
      validations: {},
    },
    {
      field: "price",
      type: "number",
      isRequired: true,
      validations: {},
    },
    {
      field: "planStartDate",
      label: "Start Date",
      type: "date",
      isRequired: true,
      validations: {},
    },
    {
      field: "planEndDate",
      label: "End Date",
      type: "date",
      isRequired: true,
      validations: {},
    },
    {
        field: "paymentMode",
        type: "select",
        isRequired: true,
        options: [
            {label: "Paypal", value: "PayPal"},
            {label: "Mopay", value: "Mopay"},
            {label: "Gift", value: "Gift"}
        ],
        validations: {},
    },
    {
        field: "confirmationToken",
        type: "string",
        label: "Payment Confirmation ID/Token",
        isRequired: false,
        validations: {},
    },
    { field: "isActive", type: "checkbox", isRequired: true, validations: {} },
    {
      field: "packId",
      label: "Pack ID",
      type: "string",
      isRequired: true,
      validations: {},
    },
    {
        field: "paymentPlanId",
        label: "payplan ID",
        type: "string",
        isRequired: true,
        validations: {},
    },
    {
        field: "userId",
        label: "User ID",
        type: "string",
        isRequired: true,
        validations: {},
    }

    // {
    //   field: "password",
    //   type: "password",
    //   isRequired: true,
    //   validations: { ...ValidationHelper.passwordPattern() },
    // },
  ];

  const searchFields: KBFilterInterface<Omit<PaymentFilter, "or" | "and">>[] = [
    { key: "id", label: "Id" },
    { key: "price", label: "Payment Price", type: "number" },
    { key: "planStartDate", label: "Plan Start Date", type: "date" },
    { key: "planEndDate", label: "Plan End Date", type: "date" },
    { key: "postDate", label: "Created Date", type: "date" },
    { key: "isActive", label: "Active", type: "checkbox" },
    { key: "packId", label: "Pack Id" },
    { key: "userId", label: "Paid by Id" },
  ];

  const sortFields: KBSortInterface<PaymentSortFields>[] = [
    { key: PaymentSortFields.Id, label: "Id" },
    { key: PaymentSortFields.Price, label: "Title" },
    { key: PaymentSortFields.PlanStartDate, label: "Amount" },
    { key: PaymentSortFields.PlanEndDate, label: "Active" },
    { key: PaymentSortFields.PostDate, label: "Posted Date" },
    { key: PaymentSortFields.PackId, label: "Pack ID" },
    { key: PaymentSortFields.UserId, label: "User ID" },
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

export default PaymentResource;
