import React from 'react';
import { View, Text } from 'react-native';
import LottieView from 'lottie-react-native';

export default class Loader extends React.Component {
  render() {
    return (
      <LottieView source={{ uri: 'https://assets4.lottiefiles.com/private_files/lf30_atgq6whw.json' }} autoPlay loop />);
  }
}