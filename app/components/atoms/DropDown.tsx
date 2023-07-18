import RNPickerSelect, { Item } from 'react-native-picker-select';

interface DropdownProps {
  list: Item[];
  onChange: (value: string) => void;
  style?: any;
}

export const Dropdown = ({ list, onChange, style }: DropdownProps) => {
  return <RNPickerSelect onValueChange={onChange} items={list} style={style} />;
};
