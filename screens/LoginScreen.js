import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, SafeAreaView, ImageBackground } from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import Loader from '../components/loader';
import Navigation from '../navigation';
import MMKV, { useMMKVBoolean, useMMKVNumber, useMMKVObject } from 'react-native-mmkv';
import useHttp from '../hooks/useHttp';
import { storage } from '../App';

const { height, width } = Dimensions.get('window');

export default function LoginScreen() {
  const [loading, setLoading] = useMMKVBoolean("@loading")
  const [userData, setUserData] = useMMKVObject("@userData");
  const [logoutTime, setLogoutTime] = useMMKVNumber("@logoutTime");
  React.useEffect(() => {
    setLoading(false)
  }, [])
  const { get, post, response, loading: ld, error } = useHttp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const onSubmit = async () => {
    try {
      const response = await post('login', { email: email, password: password });
      if (response.sucess === true) {
        setUserData(response.data);
        const currTimeinMs = parseInt(new Date().getTime());
        setLogoutTime(currTimeinMs + parseInt(1000 * 60 * 60));
        navigation.replace("Home")
      } else {
        alert("Invalid Credentials")
      }
    } catch (err) {
      console.log("ERR", err);
    }
  }




  return (<SafeAreaView
    style={{
      flex: 1,
    }}
  >
    <ImageBackground
      style={{ flex: 1, backgroundColor: 'black', backgroundColor: 'dodgerblue' }}
      source={{
        uri:
          'https://i.picsum.photos/id/907/200/200.jpg?hmac=SdeLZNONJ3CX-OB15hSXsCheWDC6yYac5N5VUJM7FIQ',
      }}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Motioncloud watch</Text>
        <Input key={2} placeholder="Enter your email address" onChangeText={e => {
          setEmail(e)
        }} />
        <Input placeholder="Enter you password" secureTextEntry={true} onChangeText={e => setPassword(e)} />
        <Button onPress={() => {
          // navigation.navigate("Home")
          onSubmit();
          // setLoading(true);
        }}>GET STARTED</Button>
        {/* <Loader /> */}
      </View>
    </ImageBackground>
    <View style={styles.creditsContainer}>
      <View>
        <Text style={styles.credits}>
          Siddharth Kumar Yadav (59)
        </Text>
        <Text style={styles.credits}>
          Dayarma Jamra (16)
        </Text>
        <Text style={styles.credits}>
          Kartik Joshi
        </Text>
      </View>
      <View>
        <Text style={styles.credits}>Minor Project </Text>
        <Text style={styles.credits}>VI Semester</Text>
        <Text style={styles.credits}>CSE Deptt.</Text>
      </View>
    </View>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    borderRadius: 12,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: 'dodgerblue',
    marginTop: height / 3,
    width: width / 1.5
  },
  heading: {
    color: 'white',
    alignSelf: 'center'
  },
  credits: {
    color: '#ccc'
  },
  creditsContainer: {
    flexDirection: 'row',
    backgroundColor: 'black',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10
  }
})