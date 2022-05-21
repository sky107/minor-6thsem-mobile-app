import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useMMKVBoolean, useMMKVObject } from 'react-native-mmkv';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import Input from '../components/Input';
import useHttp from '../hooks/useHttp';

export default function CreateDeviceScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useMMKVBoolean("@loading")
  const { get, post, response, loading: ld, error } = useHttp();
  const [lat, setLatitude] = useState('');
  const [lng, setLongitude] = useState('');

  const handleOnSumbit = async () => {
    setLoading(true);
    const rsp = await post('devices', {
      latitude: lat,
      longitude: lng
    })
    if (response.ok) {
      setLoading(false);
      navigation.replace("Motioncloud", {
        refetch: false
      })
    }


  }


  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1, paddingHorizontal: 20 }}>
      {/* <Text>Enter Device ID</Text>
      <Input placeholder="You will be provided this by our Administrator" /> */}
      <Text>Latitude of Device</Text>
      <Input placeholder="Please enter the latitude" onChangeText={setLatitude} />
      <Text>Longitude of Device</Text>
      <Input placeholder="Please enter the Longitude" onChangeText={setLongitude} />
      <Button color="white" bgColor="dodgerblue" onPress={() => handleOnSumbit()}>CREATE A DEVICE</Button>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{ alignSelf: 'center', textDecorationLine: 'underline' }}>
          Go back
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
