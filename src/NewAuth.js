import React from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, View, Button } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { styles } from './Styles';
import HomeScreen from "./HomeScreen";
import DetailsScreen from "./Details";
import SignIn from "./Signin";
import SignUp from "./Register";
import firebase from '@firebase/app'
require('firebase/auth')

const Stack = createStackNavigator();

export default class NewAuth extends React.Component {

    constructor(props) {
      super(props)
    
      this.state = {
         isLoggedIn: null
      }
    }

   componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            var uid = user.uid;
            this.setState({isLoggedIn: true })
            console.log(uid);
          } else {
            this.setState({isLoggedIn: false })
            console.log('no user')
          }
        });
      }

  render() {
      const {isLoggedIn} = this.state;
      if (isLoggedIn == null) {
          return <SafeAreaView style={styles.container}>
              <Text style ={styles.container}>Loading...</Text></SafeAreaView>;
      }
      return (
    <NavigationContainer>
    {isLoggedIn ? <HomeScreen /> : <SignIn/>}
    </NavigationContainer>
    );
  }
};