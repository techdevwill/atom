// screens/ChatScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Platform } from 'react-native';
import { Audio } from 'expo-av';
import UserTextInput from '../components/chat/UserTextInput'; // Adjust path if necessary

const ChatScreen = () => {
  const [recording, setRecording] = useState(null);
  const [soundLevel, setSoundLevel] = useState(new Animated.Value(1));
  
  useEffect(() => {
    if (Platform.OS === 'web') {
      console.warn('Microphone recording is not supported on the web.');
      return;
    }

    const startRecording = async () => {
      try {
        const { status } = await Audio.requestPermissionsAsync();
        if (status === 'granted') {
          const newRecording = new Audio.Recording();
          await newRecording.prepareToRecordAsync({
            android: {
              ...Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY.android,
              meteringEnabled: true,
            },
            ios: {
              ...Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY.ios,
              meteringEnabled: true,
            },
          });
          newRecording.setOnRecordingStatusUpdate((status) => {
            if (status.isRecording) {
              const amplitude = status.metering;
              Animated.timing(soundLevel, {
                toValue: amplitude,
                duration: 100,
                useNativeDriver: true,
              }).start();
            }
          });
          await newRecording.startAsync();
          setRecording(newRecording);
        } else {
          alert('Permission to access microphone is required!');
        }
      } catch (error) {
        console.error('Failed to start recording', error);
      }
    };

    const stopRecording = async () => {
      try {
        if (recording) {
          await recording.stopAndUnloadAsync();
          const uri = recording.getURI();
          console.log('Recording stopped and stored at', uri);
          setRecording(null);
        }
      } catch (error) {
        console.error('Failed to stop recording', error);
      }
    };

    startRecording();
    return () => {
      stopRecording();
    };
  }, []);

  const animationStyle = {
    transform: [
      {
        scale: soundLevel.interpolate({
          inputRange: [-160, 0],
          outputRange: [1, 3], // Adjust the scale range as needed
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.bubbleContainer}>
        <Text style={styles.label}>Audio bubble visual example</Text>
        <Animated.View style={[styles.bubble, animationStyle]} />
      </View>
      <UserTextInput />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bubbleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  bubble: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    borderRadius: 50,
  },
});

export default ChatScreen;
