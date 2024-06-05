import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import LoginScreen from './src/screens/login/Login'; // Ajuste o caminho conforme necessário
import MenuBar from './src/screens/menubar/MenuBar'


const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <MenuBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;
