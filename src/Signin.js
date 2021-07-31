import React from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
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

export default class SignIn extends React.Component {
  state = { email: "", password: "", errorMessage: null };

  componentDidMount() {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  }

  handleSignIn = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log(user.uid)
    this.props.navigation.navigate("Dashboard")
  })
  .catch((error) =>
    this.setState({ errorMessage: error.message }));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        {this.state.errorMessage && (
          <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
        )}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Login" onPress={this.handleSignIn} />
        <Button
          title="Don't have an account? Register!"
          onPress={() => this.props.navigation.navigate('Register')}
        />
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