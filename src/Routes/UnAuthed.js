import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from "../Signin";
import SignUp from "../Register";

const Stack = createStackNavigator();

export default function UnAuthed() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Login' component={SignIn}/>
            <Stack.Screen name='Register' component={SignUp}/>
    </Stack.Navigator>
    )}