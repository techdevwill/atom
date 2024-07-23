// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

// Define a token parameter
const tokenAmount = 1000;

const Stack = createStackNavigator();

// Custom header component
const HeaderLeft = () => (
  <View style={styles.headerLeft}>
    <Ionicons name="cash-outline" size={18} color="black" />
    <Text style={styles.tokenText}>{tokenAmount}</Text>
  </View>
);

const App = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={({ navigation }) => ({
        headerTitle: () => (
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Home</Text>
        ),
        headerTitleAlign: 'center', // Center the title
        headerLeft: () => (
          <HeaderLeft />
        ),
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('SomeRightAction')} // Replace with your action
            style={{ marginRight: 15 }}
          >
            <Ionicons name="settings-outline" size={24} color="black" />
          </TouchableOpacity>
        ),
      })}
    >
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: true }} />
    </Stack.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  tokenText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default App;
