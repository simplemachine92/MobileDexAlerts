import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {View} from 'react-native'
import { useNavigation } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons';

export function DrawerButton() {
    const navigation = useNavigation();
    return (
        <View
        style={{paddingTop: 2.5, paddingLeft: 10}}
        >
        <TouchableOpacity
        >
    <Ionicons name="menu" size={36} color="black"/>
    </TouchableOpacity>
    </View>
    );
  }

  //Replace Register Screen with notifcation screen & component when ready