import React from "react";
import HomeScreen from "../HomeScreen";
import DetailsScreen from "../Details";
import { AppRegistry } from 'react-native';
import { IconExample } from "../Icon";
import SignUp from "../Register";
import { useNavigation } from '@react-navigation/native';
import { Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function Authed() {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Dashboard" component={HomeScreen}
	options={{
          title: 'Cryptoes',
          headerRight: () => (
            <IconExample />
          ),
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          }}}/>
		{props => <HomeScreen {...props} coinID={item} />}
    <Stack.Screen name='DetailsScreen' component={DetailsScreen}/>
    <Stack.Screen name='Register' component={SignUp}/> 
    </Stack.Navigator>
    )}

    //Replace Register Screen with notifcation screen & component when ready