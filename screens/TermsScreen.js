// screens/AuthScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigation = useNavigation();

  const handleLogin = () => {
    console.log(`Email: ${email}, Password: ${password}`);
    if (email && password) {
      navigation.replace('Home');
    }
  };

  const toggleTermsAccepted = () => {
    setTermsAccepted(!termsAccepted);
    console.log(`Terms Accepted: ${!termsAccepted}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <View style={styles.termsContainer}>
        <TouchableOpacity
          style={[styles.checkbox, termsAccepted && styles.checkboxChecked]}
          onPress={toggleTermsAccepted}
        >
          {termsAccepted && <Ionicons name="checkmark" size={20} color="white" />}
        </TouchableOpacity>
        <Text style={styles.termsText}>
          I agree to the{' '}
          <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
            <Text style={styles.termsLink}>Terms and Conditions</Text>
          </TouchableOpacity>
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: email && password ? '#007BFF' : '#CCC' }]}
          onPress={handleLogin}
          disabled={!email || !password}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={[styles.socialButton, styles.disabledButton]}>
          <Ionicons name="logo-google" size={24} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialButton, styles.disabledButton]}>
          <Ionicons name="logo-facebook" size={24} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialButton, styles.disabledButton]}>
          <Ionicons name="logo-twitter" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderColor: '#007BFF',
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#007BFF',
  },
  termsText: {
    fontSize: 16,
  },
  termsLink: {
    color: '#007BFF',
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 20,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    width: '30%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#CCC',
  },
});

export default AuthScreen;
