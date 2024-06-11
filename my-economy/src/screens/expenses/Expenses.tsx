import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import styles from './ExpensesStyle';
import AsyncStorage from "@react-native-async-storage/async-storage";

const DespesaScreen = () => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [reference_month, setReference_month] = useState(null);
    const [expenseData, setExpenseData] = useState([]);

    useEffect(() => {
        handleUserExpenses();
    }, []);

    const handleUserExpenses = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const response = await axios.get('http://172.20.10.5:3005/expense', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setExpenseData(response.data.expenses);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSave = async () => {
        if (!description || !amount || !reference_month) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        const expenseData = {
            description,
            amount: parseFloat(amount),
            reference_month: reference_month.toISOString(),
        };

        try {
            const token = await AsyncStorage.getItem('userToken');
            const response = await axios.post('http://172.20.10.5:3005/expense/create', expenseData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                Alert.alert('Sucesso', 'Despesa cadastrada com sucesso!');
                setDescription('');
                setAmount('');
                setReference_month(null);
                handleUserExpenses(); // Refresh the expenses list
            } else {
                Alert.alert('Erro', `Não foi possível cadastrar a despesa: ${response.data.message}`);
            }
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao cadastrar a despesa');
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
        <View style={styles.container}>
            <Text style={styles.title}>Despesa</Text>
            <TextInput
                style={styles.input}
                placeholder="Descrição"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Valor"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
            />
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
            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
            <Text style={styles.title2}>Histórico</Text>
            <FlatList
                data={expenseData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.textContainerExpense}>
                            <Text style={styles.textStyle}>{item.description}</Text>
                            <Text style={styles.textStyle}>{item.amount}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

export default DespesaScreen;
