/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Link,
  Text,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  VStack,
  Code,
} from 'native-base';
import NativeBaseIcon from './src/components/NativeBaseIcon';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from './pages/';
import {SCREENS_LIST} from './constants/data';

const StackNav = createNativeStackNavigator();

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <StackNav.Navigator defaultScreenOptions={{headerShown: false}}>
          {SCREENS_LIST.map((screen, index) => {
            return (
              <StackNav.Screen
                key={index}
                name={screen.label}
                component={screen.component}
                options={screen.options}
              />
            );
          })}
        </StackNav.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
export default App;
