import React from "react";
import { View, Text, Pressable } from "react-native";
import styles from "./ProfileStyle";

const ProfileScreen = ({ route, navigation }) => {
  const userData = {
    name: "João da Silva",
    email: "joao.silva@example.com",
    birthDate: "1990-01-01",
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Dados</Text>
      <View style={styles.textContainer}>
      <Text style={styles.label}>Nome:</Text>
      <Text style={styles.value}>{userData.name}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{userData.email}</Text>

      <Text style={styles.label}>Data de Nascimento:</Text>
      <Text style={styles.value}>{userData.birthDate}</Text>
      </View>
      <Pressable style={styles.pressable}>
        <Text style={styles.pressableText}>SAIR</Text>
        </Pressable>
    </View>
  );
};

export default ProfileScreen;