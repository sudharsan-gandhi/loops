import { useController } from 'react-hook-form';

import { Checkbox } from '@chakra-ui/react';

export const KBCheckbox: React.FC<{
  control: any;
  label: string;
  defaultValue?: Date;
}> = ({ control, label, defaultValue }) => {
  const {
    field: { onChange, value },
  } = useController({
    name: label,
    control,
    defaultValue,
  });
  return <Checkbox control={control} onChange={onChange} />;
};
