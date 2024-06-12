import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import styles from "./HomeStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import RNPickerSelect from 'react-native-picker-select';

const HomeScreen = ({ route, navigation }) => {
  const [userData, setUserData] = useState(null);
  const [reference_month, setReference_month] = useState(null);

  useEffect(() => {
    handleUserInfo();
  }, []);

  const handleUserInfo = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await axios.get("http://192.168.0.55:3005/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data.users[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMonthChange = (month) => {
    if (month === null) {
        setReference_month(null);
        return;
    }
    const currentDate = new Date();
    const newDate = new Date(currentDate.getFullYear(), month - 1, currentDate.getDate());
    setReference_month(newDate);
};

const meses = [
  { label: 'Janeiro', value: 1 },
  { label: 'Fevereiro', value: 2 },
  { label: 'Março', value: 3 },
  { label: 'Abril', value: 4 },
  { label: 'Maio', value: 5 },
  { label: 'Junho', value: 6 },
  { label: 'Julho', value: 7 },
  { label: 'Agosto', value: 8 },
  { label: 'Setembro', value: 9 },
  { label: 'Outubro', value: 10 },
  { label: 'Novembro', value: 11 },
  { label: 'Dezembro', value: 12 },
];

  return (
    <View style={styles.hello}>
      {userData && (
        <>
          <Text style={styles.userName}>Olá {userData.name} 👋</Text>
          <Text style={styles.userHello}>É bom te ver por aqui!</Text>
        </>
      )}
      <View style={styles.container}>
      <RNPickerSelect
                onValueChange={handleMonthChange}
                items={meses}
                style={{
                    inputIOS: styles.input,
                    inputAndroid: styles.input,
                }}
                placeholder={{
                    label: 'Selecione um mês...',
                    value: null,
                }}
            />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
