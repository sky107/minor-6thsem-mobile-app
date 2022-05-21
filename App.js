import 'react-native-gesture-handler';
import React from 'react';
import { View, Text } from 'react-native';
import 'react-native-gesture-handler';
import RNRestart from 'react-native-restart';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import InfoScreen from './screens/InfoScreen'
import Navigation from './navigation/index';
import MMKV, { useMMKVBoolean, useMMKV, useMMKVNumber, useMMKVObject } from 'react-native-mmkv';
export default function App() {
  const [logoutTime, setLogoutTime] = useMMKVNumber("@logoutTime")
  const [loading, setLoading] = useMMKVBoolean("@loading")
  const [userData, setUserData] = useMMKVObject('@userData')
  React.useEffect(() => {
    setLoading(true);
    const currTime = parseInt(new Date().getTime())
    if (currTime > logoutTime && userData) {
      setUserData(null);
      RNRestart.Restart();
    } else if (!userData)
      setLoading(false)

  }, [])

  return (<>
    {loading && <LoadingScreen />}
    <Navigation />
  </>
  );
}
