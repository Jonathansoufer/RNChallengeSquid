/* eslint-disable react/react-in-jsx-scope */
import { StyleSheet, useColorScheme, StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import RootNavigator from './app/navigation/RootNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useMemo } from 'react';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { toastConfig } from '@/components/atoms/CustomToast';
import { usePerformanceAnalytics } from '@/analytics/use-performance-analytics';
import { useSessionAnalytics } from '@/analytics';

export default function App() {
  const colorScheme = useColorScheme();
  usePerformanceAnalytics();
  useSessionAnalytics();
  const theme: Theme = useMemo(
    () =>
      colorScheme === 'dark'
        ? {
            ...DarkTheme,
            colors: {
              ...DarkTheme.colors,
              primary: '#fff',
            },
          }
        : {
            ...DefaultTheme,
            colors: {
              ...DefaultTheme.colors,
              primary: '#000',
            },
          },
    [colorScheme],
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaProvider>
          <NavigationContainer theme={theme}>
            <RootNavigator />
            <Toast config={toastConfig} />
          </NavigationContainer>
          <StatusBar barStyle="default" />
        </SafeAreaProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
