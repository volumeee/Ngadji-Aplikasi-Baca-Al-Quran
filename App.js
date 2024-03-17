import {StyleSheet, View, StatusBar} from 'react-native';
import React from 'react';
import StackNavigator from './src/navigator/stackNavigator';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'rgba(0,0,0,0)'}
        barStyle="dark-content"
        translucent
      />
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
