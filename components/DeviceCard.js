import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');
import moment from 'moment';
export default function DeviceCard(props) {
  return (
    <View style={[styles.container]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row' }}>

          <Text style={styles.bold}>ID:
          </Text>
          <Text>{props.deviceId}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.bold}>

          </Text>
          <Text> {moment(props.createdAt).format("DD/MM/YYYY |  hh:mm:ss A")}</Text>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 3,
  },
  bold: {
    fontWeight: 'bold'
  }
})