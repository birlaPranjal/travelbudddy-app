import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import Header from './components/Header';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header />
      <View style={styles.content}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  content: {
    flex: 1,
    paddingTop: 60, // Adjust based on header height
  },
});

export default AuthLayout;