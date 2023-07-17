import { View, StyleSheet } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';

export const ScreenIndicators = ({
  count,
  activeIndex,
}: {
  count: number;
  activeIndex: number;
}) => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      {new Array(count).fill('1').map((_, i) => (
        <View
          style={[
            styles.indicator,
            {
              backgroundColor:
                i === activeIndex ? theme.colors.primary : theme.colors.border,
            },
          ]}
          key={i}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginVertical: 32,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 8,
  },
});
