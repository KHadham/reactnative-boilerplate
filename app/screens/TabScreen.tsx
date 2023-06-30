import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

type Tab1ScreenProps = {
  navigation: any;
}

const Tab1Screen = ({ navigation }: Tab1ScreenProps) => {
  return (
    <View style={styles.container}>
      <Button
        title="Go to Tab2"
        onPress={() => navigation.navigate('Tab2')}
      />
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
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

export default Tab1Screen;
