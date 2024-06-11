import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import styles from "./HomeStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";

const HomeScreen = ({ route, navigation }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    handleUserInfo();
  }, []);

  const handleUserInfo = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await axios.get("http://10.0.2.2:3005/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data.users[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.hello}>
      {userData && (
        <>
          <Text style={styles.userName}>Olá {userData.name} 👋</Text>
          <Text style={styles.userHello}>É bom te ver por aqui!</Text>
        </>
      )}
      <View style={styles.container}>
        <Text style={styles.userHello}>Selecione o mês</Text>
        <View style={styles.boxContainer}>
          <LinearGradient
            colors={["rgb(71, 173, 98)", "rgba(135, 204, 153, 0.8)"]}
            style={styles.background}
          />
          <Text style={styles.userHello}> STATUS DA META </Text>
        </View>
        <Text style={styles.userHello}>Progresso</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
