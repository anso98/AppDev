import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { styles } from './Styles';
import LoginScreen from './LoginScreen';
import RegistrationScreen from './RegistrationScreen';
import LogoutScreen from './LogoutScreen';
import DeleteProfileScreen from './DeleteProfileScreen';

const AuthStack = createNativeStackNavigator();

function AuthStackScreen() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Registration" component={RegistrationScreen} />
    </AuthStack.Navigator>
  );
}

const SettingsStack = createNativeStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={Settings} />
      <SettingsStack.Screen
        name="Logout"
        component={LogoutScreen}
        options={{ title: 'Logout' }}
      />
      <SettingsStack.Screen
        name="DeleteProfile"
        component={DeleteProfileScreen}
        options={{ title: 'Delete Profile' }}
      />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function MainApp() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={SettingsStackScreen} />
    </Tab.Navigator>
  );
}

function Home( { navigation }) {

  const [data, setData] = useState('');
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.178.23:5000/api/data');
      setData(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    /*<Tab.Navigator>
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Messages" component={Messages} />*/
      <View style={styles.test2}>
      <Text>{data}</Text>
      <Text>HELLO!</Text>
      <StatusBar style="auto" />
      </View>

    /*</Tab.Navigator>*/
    /*<Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings')}
      />*/
  );
  }

  function Feed(){
    return (
      <View style={styles.container}>
      <Text>FEED!</Text>
      <StatusBar style="auto" />
      </View>
    );
  }

  function Messages(){
    return (
      <View style={styles.container}>
      <Text>FEED!</Text>
      <StatusBar style="auto" />
      </View>
    );
  }

  function Profile() {
    return (
      <View style={styles.container}>
      <Text>YAY!</Text>
      <StatusBar style="auto" />
      </View>
    );
    }

function Settings({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Settings!</Text>
    </View>
    /*<Button title="Go to Home" onPress={() => navigation.navigate('Home')} />*/
  );
}

export default function App() {
  const userLoggedIn = false; // Replace this with your authentication logic

  return (
    <NavigationContainer>
      {userLoggedIn ? (
        <MainApp />
      ) : (
        <AuthStackScreen />
      )}
    </NavigationContainer>
      /*<NavigationContainer> 
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>*/
  );
}