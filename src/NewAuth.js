import React from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet, 
    Text, TextInput, View, Button } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Authed from "./Routes/Authed";
import UnAuthed from "./Routes/UnAuthed";
import { spinnerstyle } from "./spinnerstyle";
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
          } else {
            this.setState({isLoggedIn: false })
            console.log('no user')
          }
        });
      }

  render() {
      const {isLoggedIn} = this.state;
      if (isLoggedIn == null) {
          return <View style=
          {[spinnerstyle.container, spinnerstyle.horizontal]}>
              <ActivityIndicator size="large" />
              </View>;
      }
      return (
    <NavigationContainer>
    {isLoggedIn ? <Authed/> : <UnAuthed/>}
    </NavigationContainer>
    );
  }
};