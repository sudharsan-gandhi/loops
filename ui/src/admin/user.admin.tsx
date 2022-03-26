import { useState } from 'react';

import {
  KBFilterInterface,
  KBSortInterface,
} from 'components/pagination';
import { reducer } from 'components/pagination/paginate.reducer';
import {
  QueryUsersArgs,
  UserConnection,
  UserFilter,
  UserSortFields,
} from 'queries';
import { userValidations } from 'validations/user.validation';

import AdminQueries, {
  MutationField,
  ViewField,
} from './@query.admin';
import Resource, { useAdminViewData } from './_.admin';

const UserResource: React.FC = () => {
  const resource = "User";
  const viewFields: ViewField[] = [
    { field: "id", type: "string" },
    { field: "email", type: "string" },
    { field: "emailVerified", type: "boolean" },
    {
      field: "image",
      type: "link",
      linkPrefix: "/static/avatars",
      isImage: true,
    },
    { field: "about", type: "string" },
    { field: "name", type: "string" },
    { field: "authorizer", type: "string" },
    { field: "role", type: "string" },
    { field: "postDate", type: "date" },
    { field: "updatedAt", type: "date" },
  ];

  const [images, setImages] = useState();
  const mutationFields: MutationField[] = [
    {
      field: "name",
      label: "User Name",
      type: "string",
      isRequired: true,
      validations: {
        ...userValidations.name.minLength,
        ...userValidations.name.maxLength,
      },
    },
    {
      field: "email",
      type: "string",
      isRequired: true,
      validations: {
        ...userValidations.email.minLength,
        ...userValidations.email.maxLength,
        ...userValidations.email.pattern,
      },
    },
    {
      field: "password",
      type: "password",
      isRequired: true,
      validations: { ...userValidations.password.pattern },
    },
    {
      field: "image",
      type: "upload",
      mimeType: "image/*",
      fileOptions: {
        files: images,
        setFiles: setImages,
        uploadLink: "/upload/avatar",
      },
      isRequired: true,
      validations: {},
    },
    {
      field: "about",
      type: "textarea",
      label: "About",
      isRequired: false,
      validations: { ...userValidations.about.maxLength },
    },
    {
      field: "role",
      type: "string",
      label: "Role",
      isRequired: false,
      validations: {},
    },
  ];
  const searchFields: KBFilterInterface<Omit<UserFilter, "or" | "and">>[] = [
    {
      key: "id",
      label: "Id",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "name",
      label: "Name",
    },
    {
      key: "postDate",
      label: "Created Date",
      type: "date",
    },
  ];

  const sortFields: KBSortInterface<UserSortFields>[] = [
    { key: UserSortFields.Name, label: "Name" },
    { key: UserSortFields.Email, label: "Email" },
    { key: UserSortFields.Id, label: "Id" },
    { key: UserSortFields.PostDate, label: "Created Date" },
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

export default UserResource;
