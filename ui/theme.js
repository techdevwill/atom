// ThemeContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a Theme Context
const ThemeContext = createContext();

// Define a dark theme
const dark = {
  background: '#333',
  text: '#fff',
  accent: 'white',
  tabBarActiveTintColor: 'tomato',
  tabBarInactiveTintColor: 'gray',
};

// Define a light theme (optional, for future use)
const light = {
  background: '#fff',
  text: '#000',
  tabBarActiveTintColor: 'tomato',
  tabBarInactiveTintColor: 'gray',
};

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(light);

  // Toggle theme if needed
  const toggleTheme = () => {
    setTheme(theme === dark ? light : dark);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = () => useContext(ThemeContext);
