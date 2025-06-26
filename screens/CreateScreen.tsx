import { NewAppScreen } from '@react-native/new-app-screen';
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
import BackIcon from '../icons/back';
import styles from '../styles/create';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { AppStackParamList } from './navigation/RootNavigator';
import { useNavigation } from '@react-navigation/native';

type CreateScreenProps = NativeStackScreenProps<AppStackParamList, 'Create'>;

export default function CreateScreen({ navigation }: CreateScreenProps) {
  const [title, setTitle] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const API_URL = 'http://10.0.2.2:3000';

  const createGoal = async () => {
    // Валідація введених даних
    if (!title.trim()) {
      Alert.alert('Помилка', 'Введіть назву цілі');
      return;
    }

    if (!time.trim() || isNaN(Number(time)) || Number(time) <= 0) {
      Alert.alert('Помилка', 'Введіть коректну кількість годин');
      return;
    }

    // Конвертуємо години в секунди (користувач вводить години)
    const totalTimeInSeconds = Number(time) * 3600;

    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        Alert.alert('Помилка', 'Token не знайдено');
        return;
      }

      const response = await fetch(`${API_URL}/CreateGoal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          title: title.trim(), 
          hours: totalTimeInSeconds
        })
      });

      const data = await response.json();

      if (response.ok) {
        navigation.navigate('Home');
      } else {
        Alert.alert('Помилка', data.error || 'Невідома помилка');
      }
    } catch (err) {
      console.error('Помилка під час створення цілі:', err);
      Alert.alert('Сервер недоступний');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => navigation.goBack()}
      >
        <BackIcon color="#D0CDCD" />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Enter title"
        placeholderTextColor={'#D0CDCD'}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter hours"
        placeholderTextColor={'#D0CDCD'}
        value={time}
        onChangeText={setTime}
        keyboardType="numeric"
      />

      <TouchableOpacity 
        style={styles.buttonContainer}
        onPress={createGoal}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0.35, y: 0 }}
          colors={['#4CB3FD', '#4C7EFD']}
          style={styles.linearGradient}
        >
          <Text style={styles.labelButton}>Create</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}