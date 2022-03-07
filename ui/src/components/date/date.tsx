import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import { useController } from 'react-hook-form';

export const KBDatePicker: React.FC<{
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
  return (
    <SingleDatepicker onDateChange={onChange} date={value} />
  );
};
