import React, { useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import axios from 'axios';

const DeleteProfileScreen = ({ navigation }) => {
  useEffect(() => {
    const handleDeleteProfile = async () => {
      try {
        // Send a request to your server to delete the user's profile
        await axios.delete('http://your-server/delete-profile');

        // Clear the user's token securely (e.g., AsyncStorage)
        // ...

        // Redirect to the login screen
        navigation.navigate('Login');
      } catch (error) {
        Alert.alert('Delete Profile Failed', 'Error deleting user profile');
      }
    };

    handleDeleteProfile();
  }, []);

  return (
    <View>
      <Text>Delete Profile Screen</Text>
    </View>
  );
};

export default DeleteProfileScreen;
