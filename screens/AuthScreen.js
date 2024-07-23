// screens/AuthScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { login } from '../lib/firebase';
import { useAppContext } from '../context/AppContext';

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Sign Up and Login
  const [showResetPassword, setShowResetPassword] = useState(false); // Show reset password form
  const [resetEmail, setResetEmail] = useState('');
  const [systemMessage, setSystemMessage ] = useState('')
  const navigation = useNavigation();
  const {uid} = useAppContext()

  useEffect(()=>{
    if(uid) navigation.replace('Home')
  },[uid])


  const handleLogin = async () => {
    if (!email && !password) return Alert.alert('Error', 'Please enter both email and password.')
    const response = await login(email, password)
    if(response.error) return setSystemMessage(response.error)
    if(response.uid) return navigation.replace('Home');  
  };

  const handleSignUp = () => {
    console.log(`Sign Up - Email: ${email}, Password: ${password}, Confirm Password: ${confirmPassword}`);
    if (email && password && confirmPassword && password === confirmPassword && termsAccepted) {
      // navigation.replace('Home');
    } else {
      Alert.alert('Error', 'Please fill in all fields correctly and accept the terms.');
    }
  };

  const handleResetPassword = () => {
    console.log(`Reset Password - Email: ${resetEmail}`);
    if (resetEmail) {
      // Perform reset password logic here
      Alert.alert('Password Reset', 'A password reset link has been sent to your email.');
      setResetEmail('');
      setShowResetPassword(false);
    } else {
      Alert.alert('Error', 'Please enter your email address.');
    }
  };

  const toggleTermsAccepted = () => {
    setTermsAccepted(!termsAccepted);
    console.log(`Terms Accepted: ${!termsAccepted}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignUp ? 'Sign Up' : 'Login'}</Text>
    {systemMessage && <div>{systemMessage}</div>}
      {showResetPassword ? (
        <View style={styles.resetPasswordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={resetEmail}
            onChangeText={setResetEmail}
          />
          <TouchableOpacity
            style={[styles.button, { backgroundColor: resetEmail ? '#007BFF' : '#CCC' }]}
            onPress={handleResetPassword}
            disabled={!resetEmail}
          >
            <Text style={styles.buttonText}>Send Reset Link</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowResetPassword(false)} style={styles.switchText}>
            <Text>Back to {isSignUp ? 'Sign Up' : 'Login'}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
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
          {isSignUp && (
            <>
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
            </>
          )}

          <TouchableOpacity
            style={[styles.button, { backgroundColor: email && password ? '#007BFF' : '#CCC' }]}
            onPress={isSignUp ? handleSignUp : handleLogin}
            disabled={!email || !password || (isSignUp && !confirmPassword) || (isSignUp && !termsAccepted)}
          >
            <Text style={styles.buttonText}>{isSignUp ? 'Sign Up' : 'Login'}</Text>
          </TouchableOpacity>

          {!showResetPassword && (
            <>
              <View style={styles.socialContainer}>
                <TouchableOpacity style={[styles.socialButton, styles.disabledButton]}>
                  <Ionicons name="logo-google" size={24} color="#fff" />
                  <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.socialButton, styles.disabledButton]}>
                  <Ionicons name="logo-facebook" size={24} color="#fff" />
                  <Text style={styles.socialButtonText}>Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.socialButton, styles.disabledButton]}>
                  <Ionicons name="logo-twitter" size={24} color="#fff" />
                  <Text style={styles.socialButtonText}>Twitter</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => setShowResetPassword(true)} style={styles.switchText}>
                <Text>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)} style={styles.switchText}>
                <Text>{isSignUp ? 'Already have an account? Login' : 'Don’t have an account? Sign Up'}</Text>
              </TouchableOpacity>
            </>
          )}
        </>
      )}
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
  button: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%', // Make the button full width
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  socialButton: {
    width: '30%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  disabledButton: {
    backgroundColor: '#CCC',
  },
  socialButtonText: {
    color: '#fff',
    marginLeft: 10,
  },
  switchText: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetPasswordContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default AuthScreen;
