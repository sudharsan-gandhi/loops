import { useState } from 'react';

import {
  KBFilterInterface,
  KBSortInterface,
} from 'components/pagination';
import { reducer } from 'components/pagination/paginate.reducer';
import {
  GrantFilter,
  GrantSortFields,
  QueryUsersArgs,
  UserConnection,
} from 'queries';

import AdminQueries, {
  MutationField,
  ViewField,
} from './@query.admin';
import Resource, { useAdminViewData } from './_.admin';
import {
  Actions,
  Entities,
} from './resources';

const GrantResource: React.FC = () => {
  const resource = "Grant";
  const viewFields: ViewField[] = [
    { field: "id", type: "string" },
    { field: "role", type: "string" },
    { field: "resource", type: "string" },
    { field: "attributes", type: "string" },
    { field: "action", type: "string" },
    { field: "postDate", type: "date" },
    { field: "updatedAt", type: "date" },
    { field: "postedById", type: "string" },
  ];

  const mutationFields: MutationField[] = [
    { field: "role", type: "string", isRequired: true, validations: {} },
    {
      field: "resource",
      type: "select",
      options: Entities,
      isRequired: true,
      validations: {},
    },
    {
      field: "action",
      type: "select",
      options: Actions,
      isRequired: true,
      validations: {},
    },
    { field: "attributes", type: "string", isRequired: true, validations: {} },

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

  const entities = Entities.reduce<string[]>((acc, entity) => {
    acc.push(entity.value);
    return acc;
  }, []);

  const searchFields: KBFilterInterface<Omit<GrantFilter, "or" | "and">>[] = [
    { key: "id", label: "Id" },
    { key: "role", label: "Role" },
    { key: "action", label: "Action", type: "select", options: Actions },
    { key: "attributes", label: "Attributes" },
    {
      key: "resource",
      label: "Resource",
      type: "select",
      options: entities,
    },
  ];

  const sortFields: KBSortInterface<GrantSortFields>[] = [
    { key: GrantSortFields.Id, label: "Id" },
    { key: GrantSortFields.Action, label: "Action" },
    { key: GrantSortFields.Resource, label: "Resource" },
    { key: GrantSortFields.Role, label: "User Role" },
    { key: GrantSortFields.Attributes, label: "Attributes" },
    { key: GrantSortFields.PostDate, label: "Creation Date" },
    { key: GrantSortFields.PostedById, label: "User ID" },
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
      dispatch({...initialVariables})
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

export default GrantResource;
