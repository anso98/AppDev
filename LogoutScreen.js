import React, { useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import axios from 'axios';

const LogoutScreen = ({ navigation }) => {
  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Send a request to your server to log the user out
        await axios.get('http://your-server/logout');

        // Clear the user's token securely (e.g., AsyncStorage)
        // ...

        // Redirect to the login screen
        navigation.navigate('Login');
      } catch (error) {
        Alert.alert('Logout Failed', 'Error logging out');
      }
    };

    handleLogout();
  }, []);

  return (
    <View>
      <Text>Logout Screen</Text>
    </View>
  );
};

export default LogoutScreen;
