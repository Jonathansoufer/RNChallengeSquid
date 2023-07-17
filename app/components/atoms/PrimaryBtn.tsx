import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  TextStyle,
} from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';

export const PrimaryBtn = ({
  onPress,
  label,
  style,
  labelStyle,
  disable,
}: {
  onPress?: () => void;
  label: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  disable?: boolean;
}) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: theme.colors.primary, opacity: disable ? 0.5 : 1 },
        style,
      ]}
      onPress={onPress}>
      <Text
        style={[styles.label, { color: theme.colors.background }, labelStyle]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    height: 52,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { fontSize: 16, fontWeight: '600' },
});
