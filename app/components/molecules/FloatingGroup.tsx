import React, { FC, useMemo } from 'react';
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
  StyleSheet,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Layout, Spacing } from '@/utils/constants';

import { Stack } from './Stack';

interface FloatingGroupProps {
  children: any;
  noOffset?: boolean;
  sticky?: boolean;
  keyboardAvoidingEnabled?: boolean;
  onLayout?: KeyboardAvoidingViewProps['onLayout'];
  testID?: string;
}

export const FloatingGroup: FC<FloatingGroupProps> & {
  topPadding: number;
} = ({
  children,
  noOffset,
  sticky,
  keyboardAvoidingEnabled,
  onLayout,
  testID,
}) => {
  const bottomInset = useSafeAreaInsets().bottom;

  const keyboardVerticalOffset = noOffset
    ? 0
    : Platform.select({ ios: 40, default: 0 });

  return (
    <KeyboardAvoidingView
      behavior={sticky ? 'height' : 'position'}
      keyboardVerticalOffset={keyboardVerticalOffset}
      enabled={keyboardAvoidingEnabled}
      style={styles.floatingButtonContainer}
      onLayout={onLayout}
      //@ts-ignore
      bottom={bottomInset}
      testID={testID}>
      <Stack space={Spacing.base} grow>
        {children}
      </Stack>
    </KeyboardAvoidingView>
  );
};

FloatingGroup.topPadding = 40;

const styles = StyleSheet.create({
  floatingButtonContainer: {
    bottom: 0,
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
  linear: {
    paddingHorizontal: Spacing.md,
    paddingTop: FloatingGroup.topPadding,
  },
});
