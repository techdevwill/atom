// components/UserTextInput.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Animated, Easing, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have this package installed

const UserTextInput = () => {
  const [visible, setVisible] = useState(true); // State to toggle visibility
  const [message, setMessage] = useState('');
  const [animation] = useState(new Animated.Value(1)); // Animation for slide effect

  const handleSend = () => {
    if (message.trim()) {
      console.log(message);
      setMessage('');
    }
  };
  const handleClose = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => setVisible(false));
  };

  const handleOpen = () => {
    setVisible(true);
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      {visible ? (
        <Animated.View style={[styles.container, { transform: [{ translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [100, 0],
        }) }] }]}>
          <TouchableOpacity style={styles.tab} onPress={handleClose}>
            <Ionicons name="remove-outline" size={20} color="transparent" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            value={message}
            onChangeText={setMessage}
            onSubmitEditing={handleSend} // Handle Return or Enter button press
            returnKeyType="send" // Show send button on keyboard
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Ionicons name="arrow-forward-outline" size={24} color="black" />
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <TouchableOpacity style={styles.openButton} onPress={handleOpen}>
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="black" />
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingBottom: 20, // Extra padding at the bottom to accommodate the tab
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  input: {
    flex: 1,
    height: 50, // Increased height of the input box
    fontSize: 18, // Increased text size
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  sendButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    marginLeft: 10,
    padding: 8, // Smaller padding for a better fit
    backgroundColor: '#ddd',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  openButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#ddd',
    borderRadius: 25,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tab: {
    position: 'absolute',
    top: -12, // Adjust to make the tab stick out of the container
    left: '50%',
    transform: [{ translateX: -15 }], // Center the tab
    width: 30,
    height: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
    zIndex: 1000, // Ensure the tab appears above other elements
  },
});

export default UserTextInput;
