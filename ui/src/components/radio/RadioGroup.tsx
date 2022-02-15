import { useController } from 'react-hook-form';

import { RadioGroup } from '@chakra-ui/react';

export const KBRadioGroup: React.FC<{
  control: any;
  label: string;
  defaultValue?: string;
}> = ({ control, label, children, defaultValue }) => {
  const {
    field: { onChange, value },
  } = useController({
    name: label,
    control,
    defaultValue,
  });
  return (
    <RadioGroup onChange={onChange} value={value}>
      {children}
    </RadioGroup>
  );
};
