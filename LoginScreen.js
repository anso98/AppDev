import React, { useState } from 'react';
import { View, Text, TextInput, Alert} from 'react-native';
import {Card, Button} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; 
import axios from 'axios';
import { styles } from './Styles';
import IPADDRESS from './OverviewSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = () => {

  const navigation = useNavigation();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      loginIPAddress = IPADDRESS.concat('/login')
      const response = await axios.post(loginIPAddress, {
        identifier,
        password,
      });
 
      const token = response.data.token;
      console.log(token);

      // Store the token securely on the client using AsyncStorage
      await AsyncStorage.setItem('authToken', token);
  
      // Redirect to the main page
      console.log("logged in!")
      // Redirect to the main page
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
     });

      } catch (error) {
      console.log(error);
      Alert.alert('Login Failed', 'Invalid email or password');
    }
  };

  return (
    <View style={styles.container}>
        <Card style={styles.card}>
        <Card.Content>
            <TextInput
            label="Email"
            mode="outlined"
            placeholder="Enter your email or username"
            onChangeText={(text) => setIdentifier(text)}
            style={styles.input}
            />
            <TextInput
            label="Password"
            mode="outlined"
            placeholder="Enter your password"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            style={styles.input}
            />
            <Button
            mode="contained"
            style={styles.commonButton}
            onPress={() => handleLogin()}
            >
            Login
            </Button>
            <Text style={styles.registerText}>Don't have an account?</Text>
            <Button
            mode="contained"
            style={styles.commonButton}
            onPress={() => navigation.navigate('Registration')}
            >
            Register here
            </Button>
        </Card.Content>
        </Card>
    </View>
  );
};


export default LoginScreen;
