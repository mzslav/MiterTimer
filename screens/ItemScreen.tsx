import React, { useState, useEffect, useRef } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BackIcon from '../icons/back';
import DonutWrapper from '../icons/DonutWrapper';
import styles from '../styles/item';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundFetch from 'react-native-background-fetch';
import { AppStackParamList } from './navigation/RootNavigator';

type ItemScreenProps = NativeStackScreenProps<AppStackParamList, 'Item'>;

export default function ItemScreen({ navigation, route }: ItemScreenProps) {
  const { id } = route.params;

  const [title, setTitle] = useState<string>('New test Title!');
  const [currentProgress, setCurrentProgress] = useState<number>(333);
  const [goal, setGoal] = useState<number>(777);
  const [pause, setPause] = useState<boolean>(true);
  const [sessionTime, setSessionTime] = useState<number>(0);

  const timer = useRef<NodeJS.Timeout | null>(null);
  const sessionStart = useRef<number | null>(null);
  const API_URL = 'http://10.0.2.2:3000';

  const fetchGoalFromServer = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Помилка', 'Token не знайдено');
        return;
      }

      const response = await fetch(`${API_URL}/Goal/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setTitle(data.title);
        setCurrentProgress(data.progress);
        setGoal(data.total);
      } else {
        Alert.alert('Помилка', data.error || 'Невідома помилка');
      }
    } catch (err) {
      console.error('Помилка під час завантаження:', err);
      Alert.alert('Сервер недоступний');
    }
  };

  useEffect(() => {
    fetchGoalFromServer();
  }, [id]);

  useEffect(() => {
    if (!pause) {
      sessionStart.current = Date.now();

      timer.current = setInterval(() => {
        setCurrentProgress(prev => {
          const newProgress = prev + 1;
          updateGoalProgress(newProgress);
          AsyncStorage.setItem('goal_progress', newProgress.toString());
          return newProgress;
        });

        if (sessionStart.current) {
          const elapsed = Math.floor((Date.now() - sessionStart.current) / 1000);
          setSessionTime(elapsed);
        }
      }, 1000);

      AsyncStorage.setItem('goal_id', id);
      initBackgroundTask();

    } else {
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
      sessionStart.current = null;
      setSessionTime(0);
    }

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, [pause]);

  const updateGoalProgress = async (newProgress: number) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Помилка', 'Token не знайдено');
        return;
      }

      const response = await fetch(`${API_URL}/GoalUpdate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          id: parseInt(id), 
          newProgress: newProgress 
        })
      });

      const data = await response.json();
      if (!response.ok) {
        Alert.alert('Помилка', data.error || 'Помилка при оновленні прогресу');
      }
    } catch (err) {
      console.error('Помилка під час оновлення прогресу:', err);
      Alert.alert('Сервер недоступний');
    }
  };

  const initBackgroundTask = async () => {
    const status = await BackgroundFetch.configure({
      minimumFetchInterval: 15,
      stopOnTerminate: false,
      startOnBoot: true,
      enableHeadless: true,
    }, async (taskId) => {
      const progress = parseInt(await AsyncStorage.getItem('goal_progress') || '0');
      await updateGoalProgress(progress + 1);
      await AsyncStorage.setItem('goal_progress', (progress + 1).toString());
      BackgroundFetch.finish(taskId);
    }, (error) => {
      console.log('[BackgroundFetch] Error:', error);
    });

    console.log('[BackgroundFetch] Status:', status);
  };

  const toggleTimer = () => {
    setPause(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => navigation.goBack()}
      >
        <BackIcon color="#D0CDCD" />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title.slice(0, 20)}</Text>
      </View>

      <DonutWrapper
        progress={((currentProgress / goal) * 100).toFixed(2)}
        goal={goal}
      />

      <View style={styles.sessionRow}>
        <Text style={styles.titleSession}>The current session continues</Text>
        <Text style={styles.titleSession}>{sessionTime} seconds</Text>
      </View>

      <TouchableOpacity style={styles.buttonContainer} onPress={toggleTimer}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0.35, y: 0 }}
          colors={pause ? ['#4CB3FD', '#4C7EFD'] : ['#FD4C4C', '#FFC2CA']}
          style={styles.linearGradient}
        >
          <Text style={[styles.labelButton, pause ? {} : { color: 'black' }]}> {pause ? 'Start' : 'Pause'} </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
