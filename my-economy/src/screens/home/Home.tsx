import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import styles from "./HomeStyle";
import RNPickerSelect from 'react-native-picker-select';
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from 'react-native-progress/Bar'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const HomeScreen = ({ route, navigation }) => { 
  const [progress, setProgress] = useState(0.0);
  const [mes, setMes] = useState(null);
  const [limiteConsultado, setLimiteConsultado] = useState(null);
  const [expenseData, setExpenseData] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    handleUserInfo();
  }, []);

  const handleUserInfo = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await axios.get("http://192.168.0.11:3005/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data.users[0]);
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Erro ao carregar informações do usuário.');
    }
  };

  const handleMonthChange = (month) => {
    if (month === null) {
      setMes(null);
      setLimiteConsultado(null);
      setExpenseData([]);
      setProgress(0);
      return;
    }
    setMes(month.value);
  };

  const handleGetLimit = async (selectedMonth) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get(`http://192.168.0.11:3005/limit/mes/${selectedMonth}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const limitData = response.data.limits[0];
      setLimiteConsultado(limitData);
      await handleGetExpenses(limitData); // Chama a busca das despesas após obter o limite
    } catch (error) {
      console.log('ERRO: ', error);
      Alert.alert('Erro', error.response?.data || 'Erro ao buscar o limite.');
    }
  };

  const handleGetExpenses = async (limitData) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get('http://192.168.0.11:3005/expense', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const expenses = response.data.expenses;
      setExpenseData(expenses);
      updateProgress(limitData, expenses); // Atualiza o progresso após obter as despesas
    } catch (error) {
      console.log('ERRO: ', error);
      Alert.alert('Erro', 'Ocorreu um erro ao buscar as despesas.');
    }
  };

  const updateProgress = (limitData, expenseData) => {
    if (limitData && expenseData && limitData.limit > 0) {
      const totalExpenses = expenseData.reduce((sum, expenseData) => sum + expenseData.amount, 0);
      const calculatedProgress = totalExpenses / limitData.limit
      setProgress(calculatedProgress > 1 ? 1 : calculatedProgress);
    } else {
      setProgress(0);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (mes) {
        Alert.alert("teste");
        try {
          const limitData = await handleGetLimit(mes);
          if (limitData != null) {
            await handleGetExpenses(limitData);
            Alert.alert("teste");
          } else {
            setExpenseData([]);
            setProgress(0);
            Alert.alert("teste");
          }
        } catch (error) {
          console.error('Erro ao buscar dados:', error);
          Alert.alert('Erro', 'Ocorreu um erro ao buscar os dados.');
        }
      }
    };
    fetchData();
  }, [mes]);

  const meses = [
    { label: 'Janeiro', value: '01-01-2024' },
    { label: 'Fevereiro', value: '01-02-2024' },
    { label: 'Março', value: '01-03-2024' },
    { label: 'Abril', value: '01-04-2024' },
    { label: 'Maio', value: '01-05-2024' },
    { label: 'Junho', value: '01-06-2024' },
    { label: 'Julho', value: '01-07-2024' },
    { label: 'Agosto', value: '01-08-2024' },
    { label: 'Setembro', value: '01-09-2024' },
    { label: 'Outubro', value: '01-10-2024' },
    { label: 'Novembro', value: '01-11-2024' },
    { label: 'Dezembro', value: '01-12-2024' },
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
            colors={['rgb(71, 173, 98)', 'rgba(135, 204, 153, 0.8)']}
            style={styles.background}
          >
            <Text style={styles.userHello}> STATUS DA META </Text>
          </LinearGradient>
        </View>
        <Text style={styles.userHello}>Progresso</Text>
        <View style={styles.progressBar}>
          <ProgressBar
            progress={progress}
            width={null}
            height={10}
            borderRadius={5}
            color="rgb(71, 173, 98)"
            unfilledColor="rgba(135, 204, 153, 0.3)"
          />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;