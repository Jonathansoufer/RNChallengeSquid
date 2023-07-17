import React, { forwardRef, ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import BottomSheet, {
  BottomSheetProps,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { BottomSheetScrollViewMethods } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/types';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

import { Colors } from '@/utils';

const Separator = styled.View`
  height: 1px;
  background: ${Colors.separator};
  margin-top: 16px;
`;

interface CustomBottomSheetProps extends Omit<BottomSheetProps, 'children'> {
  children?: (() => React.ReactNode) | React.ReactNode[] | React.ReactNode;
  separator?: boolean;
  scrollViewChildren?: ReactNode | ReactNode[];
  scrollViewStyle?: StyleProp<Animated.AnimateStyle<StyleProp<ViewStyle>>>;
  testID?: string;
}

/**
 *  Custom BottomSheet component with the same API as @gorhom/bottom-sheet
 * @param {ReactNode} children - React nodes to be rendered inside the BottomSheet and above the scroll view
 * @param {ReactNode} scrollViewChildren - React nodes to be rendered in the scroll view
 * @param {BottomSheetProps} props - BottomSheet props
 */

export const BottomSheetComponent = forwardRef<
  BottomSheetScrollViewMethods,
  CustomBottomSheetProps
>(
  (
    {
      children,
      separator,
      scrollViewStyle = {},
      scrollViewChildren,
      style = {},
      testID,
      ...bottomSheetProps
    },
    ref,
  ) => {
    return (
      <BottomSheet
        style={style}
        backgroundStyle={styles.background}
        handleComponent={() => (
          <View style={styles.closeLineContainer}>
            <View style={styles.closeLine}></View>
          </View>
        )}
        {...bottomSheetProps}>
        <View testID={testID} style={styles.contentContainer}>
          {/* @ts-ignore */}
          {children ?? null}
          {separator ? <Separator /> : null}
          {scrollViewChildren ? (
            <BottomSheetScrollView style={scrollViewStyle} ref={ref}>
              {scrollViewChildren}
              <View style={styles.scrollViewBottomSpace} />
            </BottomSheetScrollView>
          ) : null}
        </View>
      </BottomSheet>
    );
  },
);

BottomSheetComponent.displayName = 'BottomSheetComponent';

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.ice,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  closeLine: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 3,
    height: 6,
    marginTop: 9,
    width: 40,
  },
  closeLineContainer: {
    alignSelf: 'center',
  },
  contentContainer: {
    flexGrow: 1,
  },
  scrollViewBottomSpace: {
    height: 100,
  },
});
