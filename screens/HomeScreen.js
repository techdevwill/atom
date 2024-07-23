// screens/HomeScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/useTheme'; // Import useTheme

// Import new screens
import ChatScreen from './ChatScreen';
import SettingsScreen from './SettingsScreen';
import ProfileScreen from './ProfileScreen';

// Define the tab navigator
const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const { theme } = useTheme(); // Access theme from context
  
  return (
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
        tabBarActiveTintColor: theme.tabBarActiveTintColor, // Use theme color
        tabBarInactiveTintColor: theme.tabBarInactiveTintColor, // Use theme color
        tabBarStyle: { backgroundColor: theme.background }, // Apply theme background
      })}
    >
      <Tab.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }}  />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
