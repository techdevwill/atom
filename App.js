import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Animated, Easing } from 'react-native';
import { Audio } from 'expo-av';
import CircularProgress from 'react-native-animated-circular-progress';

export default function App() {
  const [recording, setRecording] = useState(null);
  const [sound, setSound] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;
  const wave = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isRecording) {
      startBounce();
    } else {
      stopBounce();
    }
  }, [isRecording]);

  useEffect(() => {
    if (isPlaying) {
      startWave();
    } else {
      stopWave();
    }
  }, [isPlaying]);

  const startBounce = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.2,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopBounce = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).stop();
  };

  const startWave = () => {
    Animated.loop(
      Animated.timing(wave, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      })
    ).start();
  };

  const stopWave = () => {
    Animated.timing(wave, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).stop();
  };

  const handlePressIn = async () => {
    console.log('Recording started');
    setIsRecording(true);
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const handlePressOut = async () => {
    console.log('Recording stopped');
    setIsRecording(false);
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      const { sound } = await recording.createNewLoadedSoundAsync();
      setSound(sound);
      setRecording(null);
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  };

  const handlePlaySound = async () => {
    setIsPlaying(true);
    try {
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isPlaying) {
          setIsPlaying(false);
        }
      });
    } catch (err) {
      console.error('Failed to play sound', err);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={() => {
          handlePressOut();
          setTimeout(handlePlaySound, 500);
        }}
      >
        <Animated.View
          style={[
            styles.circle,
            { transform: [{ scale }], backgroundColor: isRecording ? '#ff0000' : '#0000ff' },
          ]}
        >
          {isRecording ? (
            <Text style={styles.text}>Recording...</Text>
          ) : (
            <Text style={styles.text}>Play</Text>
          )}
        </Animated.View>
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.wave,
          {
            opacity: wave,
            transform: [{ scale: wave.interpolate({ inputRange: [0, 1], outputRange: [1, 1.5] }) }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  wave: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(0, 0, 255, 0.3)',
  },
});
