import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import IPADDRESS from './OverviewSheet';


const RegistrationScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async () => {
    try {
      registIPAddress = IPADDRESS.concat('/register')
      const response = await axios.post(registIPAddress, {
        username,
        email,
        password,
      });

      // Registration successful, you can now redirect to the login screen
      print("response");
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Registration Failed', 'Error registering user');
    }
  };

  return (
    <View>
      <Text>Registration Screen</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegistration} />
    </View>
  );
};

export default RegistrationScreen;
