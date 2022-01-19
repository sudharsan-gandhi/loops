import { useState } from 'react';

import { BasePropertyProps } from 'adminjs';

import { Label } from '@adminjs/design-system';
import { Box } from '@chakra-ui/react';
import {
  Dropzone,
  FileItem,
} from '@dropzone-ui/react';
import {
  DropzoneProps,
} from '@dropzone-ui/react/build/components/dropzone/components/Dropzone/DropzoneProps';

const test: React.FC<BasePropertyProps> = (props) => {
  const { property, onChange } = props;

  console.log(props);
  const [files, setFiles] = useState([]);
  const updateFiles: DropzoneProps["onChange"] = (files) => {
    setFiles(files);
    debugger;
    onChange(property.name, files[0]?.file);
  };
  const onDelete = (id) => {
    setFiles(files.filter((x) => x.id !== id));
    onChange(property.name, files[0]?.file || undefined);
  };

  return (
    <Box py={20}>
      <Label>{property.label}</Label>
      <Dropzone
        onChange={updateFiles}
        value={files}
        maxFiles={1}
        behaviour={"replace"}
        accept={"image/*"}
        label={"Drop Files here or click to browse"}
        minHeight={"195px"}
        maxHeight={"500px"}
        disableScroll
      >
        {files.map((file) => (
          <FileItem
            {...file}
            key={file.id}
            onDelete={onDelete}
            alwaysActive
            preview
            info
            resultOnTooltip
          />
        ))}
      </Dropzone>
    </Box>
  );
};

export default test;
