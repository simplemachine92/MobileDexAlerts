import React from "react";
import HomeScreen from "../HomeScreen";
import DetailsScreen from "../Details";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function Authed() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Dashboard" component={HomeScreen}
	options={{
          title: 'Cryptoes',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          }}}/>
		{props => <HomeScreen {...props} coinID={item} />}
    <Stack.Screen name='DetailsScreen' component={DetailsScreen}/>
    </Stack.Navigator>
    )}