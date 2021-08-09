import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons';

export function IconExample() {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
        onPress={() => navigation.navigate('Register')}>
    <Ionicons name="md-notifications-sharp" size={32} color="black"/>
    </TouchableOpacity>
    );
  }

  //Replace Register Screen with notifcation screen & component when ready