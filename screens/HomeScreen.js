// screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Import new screens
import ChatScreen from './ChatScreen';
import SettingsScreen from './SettingsScreen';
import ProfileScreen from './ProfileScreen';

// Define the tab navigator
const Tab = createBottomTabNavigator();

const HomeScreen = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Chat') {
          iconName = 'chatbubble-outline'; // Icon for Chat
        } else if (route.name === 'Settings') {
          iconName = 'settings-outline'; // Icon for Settings
        } else if (route.name === 'Profile') {
          iconName = 'person-outline'; // Icon for Profile
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarLabel: () => null, // Hide tab labels
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Chat" component={ChatScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
