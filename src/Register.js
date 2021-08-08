import React from "react";
import { TouchableOpacity, StyleSheet, Text, TextInput, View, Button } from "react-native";
import { IsSignedIn } from './Signin';
import { AuthStyles } from "./AuthStyles";
import firebase from '@firebase/app'
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

export default class SignUp extends React.Component {
  state = { email: "", password: "", cpassword: "", errorMessage: null };

  confirmPassword = () => {

  } 


  handleSignUp = () => {
    if(this.state.password !== this.state.cpassword){
      return this.setState({errorMessage: 'Passwords did not match'})
    } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      //.then(() => this.props.navigation.navigate("Dashboard"))
      .catch(error => this.setState({ errorMessage: error.message }));
    }};
  render() {
    return (
      <View style={AuthStyles.container}>
        <Text style={AuthStyles.header}>Sign Up</Text>
        {this.state.errorMessage && (
          <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
        )}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={AuthStyles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={AuthStyles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <TextInput
          secureTextEntry
          placeholder="Confirm Password"
          autoCapitalize="none"
          style={AuthStyles.textInput}
          onChangeText={cpassword => this.setState({ cpassword })}
          value={this.state.cpassword}
        />
        <View style={AuthStyles.buttonContainer}>
        <TouchableOpacity
        //style={AuthStyles.button}
        onPress={this.handleSignUp}>
          <Text style={AuthStyles.buttonTextStyle}>Register</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textInput: {
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8
  }
});