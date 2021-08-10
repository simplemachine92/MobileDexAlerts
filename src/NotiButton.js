import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {View} from 'react-native'
import Notifier from './Notifier';
import { useNavigation } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons';

export function IconExample() {
    const navigation = useNavigation();
    return (
        <View
        style={{paddingRight: 10}}
        >
        <TouchableOpacity
        onPress={() => navigation.navigate('Notifier')}>
    <Ionicons name="md-notifications-sharp" margin-right={20} size={29} color="black"/>
    </TouchableOpacity>
    </View>
    );
  }

  //Replace Register Screen with notifcation screen & component when ready