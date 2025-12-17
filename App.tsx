import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from './src/constants/colors';


const App = () => {
  const [count, setCount] = useState(0);
  const [lifeCycleMessage, setLifeCycleMessage] = useState('');
  const [lifeCycleHistory, setLifeCycleHistory] = useState<string[]>([]);
  const [show, setShow] = useState(true);

  const addToHistory = (event: string) => {         //A function which accepts event parameter, it updates lifeCycleHistory state by adding event("App Mounted") at the end  of the array.
    setLifeCycleHistory(prev => [...prev, event]);
  };

  useEffect(() => {
    const mountMessage = 'Component Mounted';   //declared a variable and assigned value to it
    setLifeCycleMessage(mountMessage);  //state function, we pass the string 'Componenet Mounted' to show in the UI text
    addToHistory(mountMessage);  //save 'Component Mounted' to lifecycle history array

    const timer = setTimeout(() => {
      const dataLoadedMessage = 'Data Loaded on Mount';
      setLifeCycleMessage(dataLoadedMessage);
      addToHistory(dataLoadedMessage);
    }, 10000);
    return () => {
      clearTimeout(timer);
      addToHistory('Component Unmounted')
    };
  }, [])

  useEffect(() => {
    if (count === 0) return;
    const updateMessage = 'Component Updated - Counter Changed';
    setLifeCycleMessage(updateMessage);
    addToHistory(updateMessage);
  }, [count]);

  return (

    <View>
      <Text style={styles.text}>{lifeCycleMessage}</Text>
      <TouchableOpacity style={styles.button}
        onPress={() => setCount(count + 1)}
      >
        <Text style={styles.buttonText}>Increase Counter</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}
        onPress={() => setShow(!show)}
      >
        <Text style={styles.buttonText}>Toggle to Unmount Component</Text>
      </TouchableOpacity>
      {
        show ? <Component /> : null
      }
      <Text style={styles.text}>Counter: {count}</Text>

      <Text style={styles.text}>LifeCycle History:</Text>
      {lifeCycleHistory.map((item, index) => (
        <Text style={styles.textSmall} key={index}>
          {item}
        </Text>
      ))}


    </View>
  )
}


const Component = () => {
  useEffect(() => {
    return () => {

    };
  })
  return (
    <View>
      <Text style={styles.text}>Component</Text>
    </View>
  )
}

export default App

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