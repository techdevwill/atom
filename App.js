// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider, useTheme } from './ui/theme'; // Import ThemeProvider
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import TermsScreen from './screens/TermsScreen';
import { AppProvider } from './context/AppContext';

const Stack = createStackNavigator();

// Custom header component
const HeaderLeft = () => {
  const { theme } = useTheme(); // Access theme from context
  return (
    <View style={[styles.headerLeft, { color: theme.text }]}>
      <Ionicons name="cash-outline" size={24} color={theme.text} />
      <Text style={[styles.tokenText, { color: theme.text }]}>1000</Text>
    </View>
  );
};

const App = () => (
<AppProvider>
  <ThemeProvider>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={({ navigation }) => {
          const { theme } = useTheme(); // Access theme from context
          return {
            headerTitle: () => (
              <Text style={[{ fontSize: 20, fontWeight: 'bold' }, { color: theme.text }]}>Home</Text>
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
                <Ionicons name="settings-outline" size={24} color={theme.text} />
              </TouchableOpacity>
            ),
            headerStyle: { backgroundColor: theme.background }, // Apply theme background
            headerTintColor: theme.text, // Apply theme text color
          };
        }}
        >
        <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Terms" component={TermsScreen} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  </ThemeProvider>
</AppProvider>
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
