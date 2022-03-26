import { useState } from 'react';

import {
  audioTypes,
  genres,
  musicalNotes,
} from 'components/audio/audio.model';
import {
  KBFilterInterface,
  KBSortInterface,
} from 'components/pagination';
import { reducer } from 'components/pagination/paginate.reducer';
import {
  LoopFilter,
  LoopSortFields,
  QueryUsersArgs,
  UserConnection,
} from 'queries';
import { loopValidations } from 'validations/loop.validation';

import AdminQueries, {
  MutationField,
  ViewField,
} from './@query.admin';
import Resource, { useAdminViewData } from './_.admin';

const LoopResource: React.FC = () => {
  const resource = "Loop";

  const [audioFiles, setAudioFiles] = useState();

  const viewFields: ViewField[] = [
    { field: "id", type: "string" },
    { field: "name", type: "string" },
    { field: "genre", type: "string" },
    { field: "bpm", type: "number" },
    { field: "audioType", type: "string" },
    { field: "key", type: "string" },
    { field: "tempo", type: "number" },
    { field: "packId", type: "string" },
    {
      field: "path",
      type: "link",
      linkPrefix: "/static/packs",
      isImage: false,
    },
  ];

  const mutationFields: MutationField[] = [
    {
      field: "name",
      label: "Loop Name",
      type: "string",
      isRequired: true,
      validations: {
        ...loopValidations.name.maxLength,
        ...loopValidations.name.minLength,
      },
    },
    {
      field: "genre",
      label: "Genre",
      type: "select",
      options: [...genres],
      isRequired: true,
      validations: {},
    },
    {
      field: "bpm",
      label: "BPM",
      type: "number",
      isRequired: true,
      validations: {
        ...loopValidations.bpm.min,
        ...loopValidations.bpm.max
      },
    },
    {
      field: "path",
      label: "Upload Loop",
      type: "upload",
      fileOptions: {
        files: audioFiles,
        setFiles: setAudioFiles,
        uploadLink: "upload/audio",
      },
      isRequired: false,
      validations: {},
    },
    {
      field: "audioType",
      label: "Audio Type",
      type: "select",
      options: [...audioTypes],
      isRequired: true,
      validations: {},
    },
    {
      field: "key",
      label: "Key Notes",
      type: "select",
      options: [...musicalNotes],
      isRequired: false,
      validations: {},
    },
    {
      field: "tempo",
      label: "Tempo",
      type: "number",
      isRequired: true,
      validations: {},
    },
    {
      field: "packId",
      label: "Pack ID",
      type: "string",
      isRequired: true,
      validations: {},
    }
  ];

  const searchFields: KBFilterInterface<Omit<LoopFilter, "or" | "and">>[] = [
    { key: "id", label: "ID" },
    { key: "name", label: "Pack Name" },
    {
      key: "audioType",
      label: "Audio Type",
      type: "select",
      options: ["onshot", "loop"],
    },
    { key: "genre", label: "Genre", options: [...genres], type: "select" },
    {
      key: "key",
      label: "Music Notes",
      options: [...musicalNotes],
      type: "select",
    },
    { key: "bpm", label: "BPM", type: "number" },
    { key: "tempo", label: "Tempo", type: "number" },
    { key: "postDate", label: "Created Date", type: "date" },
    { key: "packId", label: "Pack ID" },
  ];

  const sortFields: KBSortInterface<LoopSortFields>[] = [
    { key: LoopSortFields.Id, label: "Id" },
    { key: LoopSortFields.Bpm, label: "BPM" },
    { key: LoopSortFields.Genre, label: "Genre" },
    { key: LoopSortFields.Key, label: "key/Music Notes" },
    { key: LoopSortFields.Tempo, label: "Tempo" },
    { key: LoopSortFields.AudioType, label: "Audio Type" },
    { key: LoopSortFields.PostDate, label: "Posted Date" },
    { key: LoopSortFields.PackId, label: "Pack ID" },
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

export default LoopResource;
