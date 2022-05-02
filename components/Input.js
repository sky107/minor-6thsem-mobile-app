import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function Input(props) {
  return (
    <TextInput
      style={styles.input}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    color: 'gray',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#eee',
    marginVertical: 5
  }
})
