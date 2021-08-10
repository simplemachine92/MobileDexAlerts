import React from "react";
import HomeScreen from "../HomeScreen";
import DetailsScreen from "../Details";
import { AppRegistry } from 'react-native';
import { IconExample } from "../NotiButton";
import { DrawerButton } from "../DrawerButton";
import SignUp from "../Register";
import Notifier from "../Notifier";
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function Authed() {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Dashboard" component={HomeScreen}
	options={{
          title: '',
          headerRight: () => (
            <IconExample />
          ),
          headerLeft: () => (
            <DrawerButton />
          ),
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          }}}/>
		{props => <HomeScreen {...props} coinID={item} />}
    <Stack.Screen name='DetailsScreen' component={DetailsScreen}/>
    <Stack.Screen name='Notifier' component={Notifier}/> 
    </Stack.Navigator>
    )}

    //Replace Register Screen with notifcation screen & component when ready