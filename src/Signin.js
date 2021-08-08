import React from "react";
import { Image, TouchableOpacity, StyleSheet, Text, TextInput, View, Button } from "react-native";
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

export class IsSignedIn extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
       isLoggedIn: ''
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var uid = user.uid;
        this.setState({isLoggedIn: (uid) })
      } else {
        this.setState({isLoggedIn: null })
        console.log('no user')
      }
    });
 }

  signedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var uid = user.uid;
        this.setState({isLoggedIn: (uid) })
        console.log(uid);
      } else {
        this.setState({isLoggedIn: null })
        console.log('no user')
      }
    });
  }
  
  render() {
    return (
      this.state.isLoggedIn ?
      <Text> Welcome {this.state.isLoggedIn} </Text> :
      <Text>Please log in! </Text>
    )
}
}


export default class SignIn extends React.Component {

  state = { email: "", password: "", errorMessage: null };

  resetPassword = () => {
    firebase.auth().sendPasswordResetEmail(this.state.email)
  .then(() => {
    return this.setState({errorMessage: 'Reset Email Sent'})
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });

  }

  handleSignIn = () => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
    return firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
    })
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log(user.uid)
    //this.props.navigation.navigate("Dashboard")
  })
  .catch((error) =>
    this.setState({ errorMessage: error.message }));
  }

  render() {
    return (
      <View style={AuthStyles.container}>
        <Image source={require('../assets/placeholder.jpeg')} 
        style={{ width: 100, height: 100, marginBottom: 20 }}
        />
        <Text style={AuthStyles.header}>Welcome!</Text>
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
        <View style={AuthStyles.buttonContainer}>
        <TouchableOpacity
        //style={AuthStyles.button}
        onPress={this.handleSignIn}
      >
        <Text style={AuthStyles.buttonTextStyle}>Login</Text>
      </TouchableOpacity>
        <TouchableOpacity
        //style={AuthStyles.button}
        onPress={() => this.props.navigation.navigate('Register', {screen: 'SignUp'})}
      >
        <Text style={AuthStyles.buttonTextStyle}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        //style={AuthStyles.button}
        onPress={this.resetPassword}
      >
        <Text style={AuthStyles.buttonTextStyle}>Reset Password</Text>
      </TouchableOpacity>
        </View>
      </View>
      

      
    );
  }
}