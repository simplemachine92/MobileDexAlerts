import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { gql, useQuery, ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import HomeScreen from './HomeScreen';
import SignUp from './Register';
import DetailsScreen from './Details';
import SignIn from './Signin';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import firebase from '@firebase/app';
require('firebase/auth')

const firebaseConfig = {
  apiKey: "AIzaSyA86Hy6_kZSZ6Axv1RJZAxWY6h3Z_8jcMM",
  authDomain: "crypt-dee9f.firebaseapp.com",
  databaseURL: "https://crypt-dee9f-default-rtdb.firebaseio.com",
  projectId: "crypt-dee9f",
  storageBucket: "crypt-dee9f.appspot.com",
  messagingSenderId: "102269993695",
  appId: "1:102269993695:web:90f4d977c147a95799df6a",
  measurementId: "G-6HNKXG2Y73"
};

if (!firebase.apps.length) {
firebase.initializeApp(firebaseConfig);
}

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
  cache: new InMemoryCache()
});

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const [isLoggedIn, isLoading] = useState();

  componentDidMount(
 firebase.auth().onAuthStateChanged((user) => {
   if(user){
    isLoggedIn == true;
     console.log("Auth says logged in");
   } else {
    isLoggedIn == false;
     console.log("Auth says logged out");
   }
 }))


 if (isLoading) {
  // We haven't finished checking for the token yet
  return <View><Text>Loading</Text></View>;
}

if (isLoggedIn) {
 
 return (  
<Stack.Navigator>
{isLoggedIn == true ? (
  <NavigationContainer>
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
    </NavigationContainer>
  ) : (
    <NavigationContainer>
      <Stack.Screen name="Login" component={SignIn}/>
      <Stack.Screen name="Register" component={SignUp}/>
      </NavigationContainer>
  )}
  </Stack.Navigator>
  )}
}

export default AuthNavigator;