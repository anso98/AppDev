import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// Idea: login soll über home möglich sein (dafür ist stack gut); wenn Login; dann auf die nächste Seite --> und dann eine tab benutzerauswahl!

function Home( { navigation }) {
  return (
    /*<Tab.Navigator>
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Messages" component={Messages} />*/
      <View style={styles.test2}>
      <Text>HELLO!</Text>
      <StatusBar style="auto" />
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings')}
      />
      </View>
    /*</Tab.Navigator>*/
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
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer> 
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  test2: {
    flex: 1,
    backgroundColor: '#ff5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});