import React from 'react';
import { View, Text, Modal, Dimensions, Image } from 'react-native';
import LottieView from 'lottie-react-native';
const { height, width } = Dimensions.get('window');

export default function InfoScreen() {
  return (
    <Modal transparent>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View style={{ backgroundColor: 'white', alignSelf: 'center', marginTop: height / 2.25, flexDirection: 'row', padding: 10, borderRadius: 10 }}>
          <Image
            source={require('../assets/loader.gif')}
            style={{
              width: 32,
              height: 32
            }}
          />
          <Text style={{ backgroundColor: 'white', alignSelf: 'center', paddingLeft: 10, borderRadius: 12 }}>
            Loading...
          </Text>
        </View>
      </View>
    </Modal>
  );
}
