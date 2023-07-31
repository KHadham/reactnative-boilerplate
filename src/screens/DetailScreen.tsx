import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

type DetailsScreenProps = {
  navigation: any;
}

const DetailsScreen = ({ navigation }: DetailsScreenProps) => {
  return (
    <View style={styles.container}>
      <Button
        title="Go back"
        onPress={() => navigation.goBack()}
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

export default DetailsScreen;
