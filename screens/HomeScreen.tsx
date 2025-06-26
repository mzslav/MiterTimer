import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
  Text,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import styles from '../styles/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppStackParamList } from './navigation/RootNavigator';
import LogOutIcon from '../icons/logout';

type Goal = {
  id: string;
  title: string;
  progress: number;
  total: number;
};

type HomeScreenProps = NativeStackScreenProps<AppStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [goals, setGoals] = useState<Goal[]>([]);
  const API_URL = 'http://10.0.2.2:3000';

  const fetchGoalsFromServer = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        Alert.alert('Помилка', 'Token не знайдено');
        return;
      }

      const response = await fetch(`${API_URL}/GetGoals`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setGoals(data);
      } else {
        Alert.alert('Помилка', data.error || 'Невідома помилка');
      }
    } catch (err) {
      console.error('Помилка під час завантаження:', err);
      Alert.alert('Сервер недоступний');
    }
  };

  useEffect(() => {
    fetchGoalsFromServer();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconCon} onPress={handleLogout}>
        <LogOutIcon />
      </TouchableOpacity>

      <View style={styles.dataContainer}>
        <FlatList
          data={goals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.dataRow}
              onPress={() => navigation.navigate('Item', { id: item.id })}
            >
              <Text style={styles.titleItem}>
                {item.title.length < 20 ? item.title : item.title.slice(0, 18) + '...'}
              </Text>

              <Text style={styles.titleProgress}>{((item.progress * 100) / item.total).toFixed(0)}%</Text>
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('Create')}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0.35, y: 0 }}
            colors={['#4CB3FD', '#4C7EFD']}
            style={styles.linearGradient}
          >
            <Text style={styles.labelButton}>Create New Goal</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}