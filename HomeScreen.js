import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert} from 'react-native';
import {Card, Button} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; 
import axios from 'axios';
import { styles } from './Styles';
import IPADDRESS from './OverviewSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';


const Home = () => {

    const [data, setData] = useState('');
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        apidatalink = IPADDRESS.concat("/api/data");
        const response = await axios.get(apidatalink);
        setData(response.data.message);
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
        <View style={styles.test2}>
        <Text>{data}</Text>
        <Text>HELLO!</Text>
        <StatusBar style="auto" />
        </View>
    );
    }

export default Home;
