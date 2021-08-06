import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { gql, useQuery, ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import HomeScreen from './HomeScreen';
import SignUp from './Register';
import DetailsScreen from './Details';
import SignIn from './Signin';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import IsUser from './NewAuth';
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

export const Router = () => (
    {isLoggedIn}
    );