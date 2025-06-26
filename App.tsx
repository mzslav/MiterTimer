import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './screens/navigation/RootNavigator';
import { enableScreens } from 'react-native-screens';
enableScreens();

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
