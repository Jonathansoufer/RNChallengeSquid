/**
 * This file contains all the layout constants used in the app so that we can avoid, different looking and feelings
 */
import {Dimensions} from 'react-native';

import {initialWindowMetrics} from 'react-native-safe-area-context';

export const fullWidth = Dimensions.get('window').width;

export const fullHeight = Dimensions.get('window').height;

export const fullScreenWidth = Dimensions.get('screen').width;
export const fullScreenHeight = Dimensions.get('screen').height;

export const Layout = {
  window: {
    width: fullWidth,
    height: fullHeight,
  },
  isSmallDevice: fullWidth < 375,
};

export const hitSlop = {
  top: 40,
  bottom: 40,
  left: 40,
  right: 40,
};

export const initialSafeAreaInsets = initialWindowMetrics?.insets ?? {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};
