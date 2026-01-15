// src/screens/PortfolioScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PortfolioScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Portfolio Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6f8f6',
  },
  text: {
    fontSize: 20,
    fontFamily: 'Manrope-Bold',
  },
});

export default PortfolioScreen;