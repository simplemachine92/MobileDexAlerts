import React from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import firebase from '@firebase/app'
require('firebase/auth')

export const AuthProvider = () => {
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      // ...
    } else {
      var uid = null;
    }
  });
  return (uid)
}