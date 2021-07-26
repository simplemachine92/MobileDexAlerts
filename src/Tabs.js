import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeScreen from './HomeScreen';
import DetailsScreen from './Details';

const Tab = createBottomTabNavigator();

export default function MyTabs({route}) {
  return (
      <NavigationContainer>
          <Stack.Screen>
          <Text>Im gay!</Text>
          </Stack.Screen>
      </NavigationContainer>
      
  );
}