import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

type HomeScreenProps = {
  navigation: any;
}

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <View style={styles.container}>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      <Button
        title="Go to Tab Navigator"
        onPress={() => navigation.navigate('MainTab')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
