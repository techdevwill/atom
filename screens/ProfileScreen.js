// screens/ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../ui/elements';
import { logout } from '../lib/firebase';




const ProfileScreen = () => (
  <View style={styles.container}>
    <Text>Profile Screen</Text>
    <Button label="Logout" color="red" onPress={logout} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
