/* eslint-disable react/react-in-jsx-scope */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { useMemo } from 'react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import RootNavigator from './app/navigation/RootNavigation';

import { useSessionAnalytics } from '@/analytics';
import { usePerformanceAnalytics } from '@/analytics/use-performance-analytics';
import { toastConfig } from '@/components/atoms/CustomToast';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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
          <NativeBaseProvider>
            <NavigationContainer theme={theme}>
              <RootNavigator />
              <Toast config={toastConfig} />
            </NavigationContainer>
          </NativeBaseProvider>
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
