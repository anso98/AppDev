import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


import IPADDRESS from './OverviewSheet';
import { styles } from './Styles';
import LoginScreen from './LoginScreen';
import Settings from './SettingsScreen';
import RegistrationScreen from './RegistrationScreen';
import Home from './HomeScreen';

const AuthStack = createNativeStackNavigator(); // For authentication screens
const MainTabNavigator = createBottomTabNavigator(); // For your main app screens

//Function overview LoginScreen & Registration screen
function AuthStackScreens() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Registration" component={RegistrationScreen} />
    </AuthStack.Navigator>
  );
}

//Function overview as soon as logged in
function MainAppScreens({ onLogout }) {
  return (
    <MainTabNavigator.Navigator>
      <MainTabNavigator.Screen name="Home" component={Home} />
      <MainTabNavigator.Screen name="Settings" component={Settings}
        options={{
          headerRight: () => (
            <Button onPress={() => onLogout()} title="Logout" />
          ),
        }}
      />
    </MainTabNavigator.Navigator>
  );
}


export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // CHECK if user is logged in 
  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };
    checkAuthentication();
  }, []);

  // Logout function
  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken'); 
    setIsAuthenticated(false);
  };
  //const userLoggedIn = false; // Replace this with your authentication logic

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <MainAppScreens onLogout={handleLogout} />
      ) : (
        <AuthStackScreens />
      )}
    </NavigationContainer>
  );
}