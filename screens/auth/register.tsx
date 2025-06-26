import { NewAppScreen } from '@react-native/new-app-screen';
import {
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
  Text,
  TextInput,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/RootNavigator';

import styles from '../../styles/login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: LoginScreenProps) {

  const API_URL = 'http://10.0.2.2:3000';


  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [passwordRe, setPasswordRe] = useState<string>()

  
  const handleRegister = async () => {

    if (!(password == passwordRe)) {
      return Alert.alert('Password must be similar')
    }

    try {
      const response = await fetch(`${API_URL}/CreateUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('token', data.token);
        navigation.navigate('Login')
        Alert.alert('Success');
      } else {
        Alert.alert('Error', data.error || 'Empty');
      }
    } catch (err) {
      console.error('Login error:', err);
      Alert.alert('Error', 'Server dont responde');
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
        <View style={styles.inputContainer}>
          <View>
            <Text style={styles.label}>Email</Text>
            <TouchableOpacity style={styles.input}>
              <TextInput placeholder="Enter your Email"
              value={email}
              onChangeText={setEmail}
              ></TextInput>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.label}>Password</Text>
            <TouchableOpacity style={styles.input}>
              <TextInput placeholder="Enter your password" value={password} onChangeText={setPassword}></TextInput>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.label}>Password</Text>
            <TouchableOpacity style={styles.input}>
              <TextInput placeholder="Enter your password again" value={passwordRe} onChangeText={setPasswordRe}></TextInput>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleRegister}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0.35, y: 0 }}
            colors={['#4CB3FD', '#4C7EFD']}
            style={styles.linearGradient}
          >
            <Text style={styles.labelButton}>Register</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.transparentButton}
          onPress={handleLogin}
        >
          <Text style={styles.labelButton}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
