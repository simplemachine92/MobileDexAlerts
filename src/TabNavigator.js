import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Stack.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default BottomTabNavigator;