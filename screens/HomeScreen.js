
import React, { useState, useRef, useMemo, useCallback } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { useMMKVBoolean, useMMKVObject } from 'react-native-mmkv';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import Button from '../components/Button';
import Divider from 'react-native-divider';
import Card from '../components/Card';
import Handle from '../components/Handle';
import DeviceCard from '../components/DeviceCard';
import SwitchSelector from "react-native-switch-selector";
import DropDownPicker from 'react-native-dropdown-picker';
import CalendarModal from '../components/Calendar';
import useHttp from '../hooks/useHttp';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useMMKVBoolean("@loading")
  const [useData, setUserData] = useMMKVObject("@userData");
  const { get, post, response, loading: ld, error } = useHttp();
  const [activites, setActivites] = useState([]);
  const [deviceCount, setDeviceCounts] = useState(null);

  const bottomSheetModalRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    { label: 'Spain', value: 'spain' },
    // { label: 'Madrid', value: 'madrid', parent: 'spain' },
    // { label: 'Barcelona', value: 'barcelona', parent: 'spain' },

    { label: 'Italy', value: 'italy' },
    // { label: 'Rome', value: 'rome', parent: 'italy' },

    { label: 'Finland', value: 'finland' }
  ]);

  // variables
  const snapPoints = useMemo(() => ['25%', '30%'], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setDeviceCounts(null);
      setLoading(true)
      async function fetchData() {
        const records = await get('activity')
        const counts = await get('devices/count');
        const devices = await get('/devices');
        const rsp = await Promise.all([get('activity'), get('devices'), get('devices/count')]);
        if (response.ok) {
          setActivites(rsp[0].data);
          setDeviceCounts(rsp[2].data);
          let aa = [];
          rsp[1].data.forEach(e => {
            aa.push({ label: e.deviceId, value: e._id.toString() })
          })
          setItems(aa);
          setLoading(false);
        }


      }
      fetchData();

    }, [navigation])
  );




  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (<View>
        <Button onPress={() => handlePresentModalPress()} color="dodgerblue">MORE</Button>
      </View>
      ),
    });
  }, [navigation]);

  const handleLogout = async () => {
    setLoading(true);
    const response = await get('/logout');
    setUserData(null);
    navigation.navigate("Login")
    setLoading(false);
  }
  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
        <Divider borderColor="#ccc" orientation="center" color="gray">Your Devices</Divider>
        <View style={{ flexDirection: 'row', margin: 5, padding: 5, justifyContent: 'space-evenly' }}>
          <Card key={1} count={deviceCount?.active} bgColor="#2E85CA">Connected</Card>
          <Card count={3} count={deviceCount?.total} bgColor="#2897B4">Total</Card>
          <Card count={2} count={deviceCount?.inActive} bgColor="#454F63">Inactive</Card>
        </View>
        <Divider borderColor="#ccc" orientation="center" color="gray">Recent activities</Divider>
        <View style={{ paddingHorizontal: 20 }}>
          {/* <SwitchSelector
            initial={0}
            onPress={value => { }}
            textColor={'gray'} //'#7a44cf'
            selectedColor={'#2E85CA'}
            buttonColor={'#eee'}
            borderColor={'#eee'}
            borderRadius={10}
            fontSize={18}
            // hasPadding
            options={[
              { label: "  Logs", value: "f", imageIcon: require('../assets/inboxIcon.png') }, //images.feminino = require('./path_to/assets/img/feminino.png')
              { label: "  Show on Map", value: "m", imageIcon: require('../assets/globeIcon.png') } //images.masculino = require('./path_to/assets/img/masculino.png')
            ]}
            testID="gender-switch-selector"
            accessibilityLabel="gender-switch-selector"
          /> */}


          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            // theme="DARK"
            placeholder='Selct a device to Filter the records'
            placeholderStyle={{ color: 'gray' }}
            style={{ borderColor: 'gray' }}
            multiple={true}
            mode="BADGE"
            // badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
            options={[
              { label: "  Logs", value: "f", imageIcon: require('../assets/inboxIcon.png') }, //images.feminino = require('./path_to/assets/img/feminino.png')
              { label: "  Show on Map", value: "m", imageIcon: require('../assets/globeIcon.png') } //images.masculino = require('./path_to/assets/img/masculino.png')
            ]}
          />

          <ScrollView style={styles.listContainer}>
            {/* <Divider orientation='center'>Filter</Divider> */}

            {/* <CalendarModal /> */}




            <View style={{ flexDirection: 'row' }}>




            </View>

            {activites.map((ac, idx) =>
              <DeviceCard key={`ac-card-${idx}`} {...ac} bgColor="gray" />
            )}
          </ScrollView>
        </View>

        <View style={styles.container}>

          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            handleComponent={Handle}
          >

            <View style={styles.contentContainer}>
              <TouchableOpacity onPress={() => navigation.navigate("MapViewScreen")} >
                <Image source={require('../assets/configureIcon.png')}
                  style={{ height: 40, width: 40, alignSelf: 'center' }}
                />
                <Text>
                  MAP VIEW
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Create a new Device")}>
                <Image source={require('../assets/createIcon.png')}
                  style={{ height: 40, width: 40, alignSelf: 'center' }}
                />
                <Text>
                  CREATE
                </Text>
              </TouchableOpacity>
              <View>
                <TouchableOpacity onPress={() => handleLogout()}>

                  <Image source={require('../assets/logoutIcon.png')}
                    style={{ height: 40, width: 40, alignSelf: 'center' }}
                  />
                  <Text>
                    SignOut
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </BottomSheetModal>
        </View>
      </SafeAreaView >
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    // backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  listContainer: {
    paddingVertical: 10
  }
})