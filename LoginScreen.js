import React, { useState } from 'react';
import { View, Text, TextInput, Alert} from 'react-native';
import {Card, Button} from 'react-native-paper';
import axios from 'axios';
import { styles } from './Styles';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.178.23:5000/login', {
        email,
        password,
      });

      const token = response.data.token;

      // Store the token securely on the client (e.g., AsyncStorage)
      // ...

      // Redirect to the main page
      navigation.navigate('Main');
    } catch (error) {
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
            placeholder="Enter your email"
            onChangeText={(text) => setEmail(text)}
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
