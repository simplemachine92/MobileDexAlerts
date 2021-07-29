import React from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import firebase from '@firebase/app'
require('firebase/auth')

export default class SignUp extends React.Component {
  state = { email: "", password: "", errorMessage: null };
  componentDidMount() {

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
    
    firebase.initializeApp(firebaseConfig);
  }

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate("Dashboard"))
      .catch(error => this.setState({ errorMessage: error.message }));
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
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
        <Button title="Sign Up" onPress={this.handleSignUp} />
        <Button
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate("Login")}
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