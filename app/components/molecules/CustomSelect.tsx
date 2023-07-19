import { CheckIcon, Select, Text, VStack } from 'native-base';
import React from 'react';

interface CustomSelectProps {
  label: string;
  selectedValue: string;
  minWidth: string | number;
  accessibilityLabel: string;
  placeholder: string;
  items: { label: string; value: string }[];
  onValueChange: (itemValue: string) => void;
  disabled?: boolean;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  selectedValue,
  minWidth,
  accessibilityLabel,
  placeholder,
  items,
  disabled,
  onValueChange,
}) => {
  return (
    <VStack space={1} alignItems="left">
      <Text fontSize="xs">{label}</Text>
      <Select
        selectedValue={selectedValue}
        isDisabled={disabled}
        minWidth={minWidth}
        accessibilityLabel={accessibilityLabel}
        placeholder={placeholder}
        _selectedItem={{
          bg: 'teal.600',
          endIcon: <CheckIcon size="5" />,
        }}
        mt={1}
        onValueChange={onValueChange}>
        {items.map((item, index) => {
          return (
            <Select.Item label={item.label} value={item.value} key={index} />
          );
        })}
      </Select>
    </VStack>
  );
};
