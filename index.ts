import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import BackgroundFetch, { HeadlessEvent } from 'react-native-background-fetch';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BackgroundTask = async (event: HeadlessEvent) => {
  const { taskId } = event;

  try {
    const progress = parseInt((await AsyncStorage.getItem('goal_progress')) || '0');
    const id = await AsyncStorage.getItem('goal_id');
    const token = await AsyncStorage.getItem('token');

    if (id && token) {
      await fetch('http://10.0.2.2:3000/GoalUpdate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: parseInt(id),
          newProgress: progress + 1,
        }),
      });

      await AsyncStorage.setItem('goal_progress', (progress + 1).toString());
      console.log('[BackgroundFetch] Успішне оновлення прогресу у фоновому режимі');
    }
  } catch (error) {
    console.warn('[BackgroundFetch Error]', error);
  }

  BackgroundFetch.finish(taskId);
};

BackgroundFetch.registerHeadlessTask(BackgroundTask);

AppRegistry.registerComponent(appName, () => App);
