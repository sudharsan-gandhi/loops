import { useState } from 'react';

import {
  KBFilterInterface,
  KBSortInterface,
} from 'components/pagination';
import { reducer } from 'components/pagination/paginate.reducer';
import {
  CarouselFilter,
  CarouselSortFields,
  QueryUsersArgs,
  UserConnection,
} from 'queries';

import AdminQueries, {
  MutationField,
  ViewField,
} from './@query.admin';
import Resource, { useAdminViewData } from './_.admin';

const CarouselResource: React.FC = () => {
  const resource = "Carousel";
  const [images, setImages] = useState();
  const viewFields: ViewField[] = [
    { field: "id", type: "string" },
    {
      field: "image",
      type: "link",
      linkPrefix: "/static/avatars",
      isImage: true,
    },
    { field: "packId", type: "string" },
    { field: "authorId", type: "string" },
    { field: "postDate", type: "date" },
    { field: "updatedAt", type: "date" },
    { field: "deletedAt", type: "date" },
  ];

  const mutationFields: MutationField[] = [
    {
      field: "packId",
      label: "Pack Id",
      type: "string",
      isRequired: true,
      validations: {},
    },
    {
      field: "authorId",
      label: "User Id",
      type: "ref",
      isRequired: true,
      validations: {},
      refFn: (user, _) => {
        return user.id;
      },
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
  ];

  const searchFields: KBFilterInterface<Omit<CarouselFilter, "or" | "and">>[] =
    [
      { key: "id", label: "Id" },
      { key: "packId", label: "Pack Id" },
      { key: "authorId", label: "User Id" },
      { key: "postDate", label: "Created Date", type: "date" },
    ];

  const sortFields: KBSortInterface<CarouselSortFields>[] = [
    { key: CarouselSortFields.Id, label: "Id" },
    { key: CarouselSortFields.PackId, label: "Pack Id" },
    { key: CarouselSortFields.AuthorId, label: "User ID" },
    { key: CarouselSortFields.PostDate, label: "Created Date" },
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

export default CarouselResource;
