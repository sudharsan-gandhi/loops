import { useRef } from 'react';

import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import { useController } from 'react-hook-form';
import { MdClear } from 'react-icons/md';

import {
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

export const KBDatePicker: React.FC<{
  control: any;
  label: string;
  defaultValue?: Date;
}> = ({ control, label, defaultValue }) => {
  const ref = useRef();
  const {
    fieldState,
    field: { onChange, value },
  } = useController({
    name: label,
    control,
    defaultValue,
  });

  return (
    <InputGroup>
      <SingleDatepicker onDateChange={onChange} date={value} />
      <InputRightElement
        children={<MdClear />}
        onClick={() => {
          onChange();
        }}
      />
    </InputGroup>
  );
};
