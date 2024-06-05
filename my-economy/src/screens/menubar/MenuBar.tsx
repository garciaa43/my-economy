import React, { useState } from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './MenuBarStyle';
import App from "../../../App";

const MenuBar = () => {
  const [activeItem, setActiveItem] = useState('perfil');

  const handleMenuClick = (item) => {
    setActiveItem(item);
  };

  return (
    <View style={styles.menuBar}>
      <TouchableOpacity
        style={[styles.menuItem, activeItem === 'perfil' && styles.activeItem]}
        onPress={() => handleMenuClick('perfil')}
      >
        <Text style={styles.menuText}>Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.menuItem, activeItem === 'economia' && styles.activeItem]}
        onPress={() => handleMenuClick('economia')}
      >
        <Text style={styles.menuText}>Economia</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.menuItem, activeItem === 'adicionar' && styles.activeItem]}
        onPress={() => handleMenuClick('adicionar')}
      >
        <Text style={styles.menuText}>Adicionar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.menuItem, activeItem === 'configuracao' && styles.activeItem]}
        onPress={() => handleMenuClick('configuracao')}
      >
        <Text style={styles.menuText}>Configuração</Text>
      </TouchableOpacity>
    </View>
  );
};


export default App;
