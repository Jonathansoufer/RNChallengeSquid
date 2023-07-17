import React from 'react';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import { Scene01, Scene02, Scene03, Scene04 } from '../screens/Onboarding';
import { Home } from '../screens/Home';
import { Swap } from '../screens/Swap';

export type RootStackParamList = {
  Scene01: undefined;
  Scene02: undefined;
  Scene03: undefined;
  Scene04: undefined;
  Home: undefined;
  Swap: undefined;
};
const RootStack = createNativeStackNavigator<RootStackParamList>();

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const RootNavigation = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Group
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}>
        <RootStack.Screen name="Scene01" component={Scene01} />
        <RootStack.Screen name="Scene02" component={Scene02} />
        <RootStack.Screen name="Scene03" component={Scene03} />
        <RootStack.Screen name="Scene04" component={Scene04} />
        <RootStack.Screen name="Home" component={Home} />
        <RootStack.Screen name="Swap" component={Swap} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootNavigation;
