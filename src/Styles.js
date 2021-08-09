import React from 'react';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 12,
     padding: 20,
     //backgroundColor: '#FFFFFF'
    },
    item: {
      flex: 1,
      marginBottom: 0,
      marginTop: 20,
      marginLeft: 20,
      marginRight: 20,
      fontSize: 16,
      padding:10,
      borderWidth: 2,
      borderColor: "gray",
      borderRadius: 12,
      backgroundColor: '#2BA7FA',
      overflow: "hidden"
      
    },
    title: {
        display: 'flex',
      padding: 10,
      fontSize: 24,
      textAlign: 'center',
  //backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    }
  });