import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');
export default function Card(props) {
  return (
    <View style={[styles.container, { backgroundColor: props.bgColor }]}>
      <Text style={{ alignSelf: 'center', color: 'white' }}>{props.count}</Text>
      <Text style={{ alignSelf: 'center', color: 'white' }}>{props.children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    backgroundColor: '#2E85CA',
    padding: 10,
    borderRadius: 12,
    width: width / 4
  }
})