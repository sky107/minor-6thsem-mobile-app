
import * as React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs, TransitionPresets } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useMMKVBoolean, useMMKVObject } from 'react-native-mmkv';
import Divider from 'react-native-divider';
import Card from '../components/Card';
import DropDown from '../components/DropDown';
import HomeScreen from '../screens/HomeScreen';
import CreateDeviceScreen from '../screens/CreateDeviceScreen';
import MapViewScreen from '../screens/MapViewScreen';
const Tab = createMaterialBottomTabNavigator();


function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}



const Stack = createStackNavigator();

const LoggedInNavigator = () => {
  return (<Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: 'white',
        height: 80
      },
      headerTitleStyle: {
        color: 'dodgerblue'
      },
      // headerLeft: false

    }}
  >
    <Stack.Screen name="Motioncloud" component={HomeScreen} />
    <Stack.Screen name="Create a new Device" component={CreateDeviceScreen}
      screenOptions={{

      }}
    />
    <Stack.Screen name="MapViewScreen" component={MapViewScreen}
      screenOptions={{

      }}
    />
  </Stack.Navigator >);
}

function Navigation() {

  const [userData, setUserData] = useMMKVObject("@userData");

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"
        screenOptions={{
          headerShown: false
        }}
      >
        {!userData && <Stack.Screen name="Login" component={LoginScreen}
          options={{
            transitionSpec: {
              open: TransitionSpecs.TransitionIOSSpec,
              close: TransitionSpecs.TransitionIOSSpec,
            },
            ...TransitionPresets.SlideFromRightIOS
          }}
        />}
        <Stack.Screen name="Home" component={LoggedInNavigator}
          options={{
            transitionSpec: {
              open: TransitionSpecs.TransitionIOSSpec,
              close: TransitionSpecs.TransitionIOSSpec,
            },
            ...TransitionPresets.SlideFromRightIOS
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;