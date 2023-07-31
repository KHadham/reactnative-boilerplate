import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

type Tab2ScreenProps = {
  navigation: any;
}

const Tab2Screen = ({ navigation }: Tab2ScreenProps) => {
  return (  
    <View style={styles.container}>
      <Button
        title="Go to Tab1"
        onPress={() => navigation.navigate('Tab1')}
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

export default Tab2Screen;

