import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Button(props) {

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.button, { backgroundColor: props.bgColor }]}>
      <Text style={[styles.buttonInnerText, { color: props.color }]}>{props.children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    // borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center'
  },
  buttonInnerText: {
    color: 'white',
    fontWeight: '600'
  }
})