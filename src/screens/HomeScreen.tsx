import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../constants/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useFocusEffect } from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
  const [count, setCount] = useState(0);
  const [lifeCycleMessage, setLifeCycleMessage] = useState('');
  const [lifeCycleHistory, setLifeCycleHistory] = useState<string[]>([]);

  const addToHistory = (event: string) => {
    setLifeCycleHistory(prev => [...prev, event]);
  };

  // MOUNT & UNMOUNT
  useEffect(() => {
    const mountMessage = 'Component Mounted';
    setLifeCycleMessage(mountMessage);
    addToHistory(mountMessage);

    const timer = setTimeout(() => {
      const dataLoadedMessage = 'Data Loaded on Mount';
      setLifeCycleMessage(dataLoadedMessage);
      addToHistory(dataLoadedMessage);
    }, 2000);

    return () => {
      clearTimeout(timer);
      addToHistory('Component Unmounted (Removed from Stack)');
    };
  }, []);

  // UPDATE
  useEffect(() => {
    if (count === 0) return;
    const updateMessage = 'Component Updated - Counter Changed';
    setLifeCycleMessage(updateMessage);
    addToHistory(updateMessage);
  }, [count]);

  // BLUR (navigation away)
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        const blurMessage = 'Component Blurred (Navigated Forward)';
        setLifeCycleMessage(blurMessage);
        addToHistory(blurMessage);
      };
    }, [])
  );

  return (
    <View>
      <Text style={styles.text}>{lifeCycleMessage}</Text>

      <TouchableOpacity style={styles.button} onPress={() => setCount(count + 1)}>
        <Text style={styles.buttonText}>Increase Counter</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Next')}
      >
        <Text style={styles.buttonText}>Go to Next Screen</Text>
      </TouchableOpacity>

      <Text style={styles.text}>Counter: {count}</Text>

      <Text style={styles.text}>LifeCycle History:</Text>
      {lifeCycleHistory.map((item, index) => (
        <Text key={index} style={styles.textSmall}>
          {item}
        </Text>
      ))}
    </View>
  );
};

export default HomeScreen;


const styles = StyleSheet.create({

  text: {
    fontSize: 26,
  },
  textSmall: {
    fontSize: 18,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.background,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
})