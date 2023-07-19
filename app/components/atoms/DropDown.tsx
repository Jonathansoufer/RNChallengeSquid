import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select';

export const Dropdown = ({
  items,
  onValueChange,
  style,
}: PickerSelectProps) => {
  return (
    <RNPickerSelect onValueChange={onValueChange} items={items} style={style} />
  );
};
