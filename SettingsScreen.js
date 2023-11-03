import React, { useState } from 'react';
import { View, Text, TextInput, Alert} from 'react-native';
import {Card, Button} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; 
import axios from 'axios';
import { styles } from './Styles';
import IPADDRESS from './OverviewSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import LogoutScreen from './LogoutScreen';
import DeleteProfileScreen from './DeleteProfileScreen';


const SettingsStack = createNativeStackNavigator(); // For settings and user profile screens

//Function overview Settings
const Settings = () => {
    return (
      <SettingsStack.Navigator>
        <SettingsStack.Screen name="Profile" component={Profile} />
        <SettingsStack.Screen name="Logout" component={LogoutScreen} options={{ title: 'Logout' }} />
        <SettingsStack.Screen name="DeleteProfile" component={DeleteProfileScreen}options={{ title: 'Delete Profile' }} />
      </SettingsStack.Navigator>
    );
}
  
  //Screen 1 of Settings (when logged in) -> Ebene 3 
  function Profile() {
    return (
      <View style={styles.container}>
      <Text>YAY!</Text>
      <StatusBar style="auto" />
      </View>
    );
    }

 export default Settings;
