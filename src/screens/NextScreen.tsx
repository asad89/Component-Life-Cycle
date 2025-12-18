import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Next'>;

const NextScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Next Screen</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.pop()}
      >
        <Text style={styles.buttonText}>Go Back (POP)</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NextScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 26,
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#333',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
