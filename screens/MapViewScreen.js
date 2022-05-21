import React, { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import useHttp from '../hooks/useHttp';
import Card from '../components/Card';
import { useMMKVBoolean } from 'react-native-mmkv';
const { height, width } = Dimensions.get('window');

export default function MapViewScreen() {

  const [loading, setLoading] = useMMKVBoolean("@loading")
  const { get, post, response, loading: ld, error } = useHttp();
  const [deviceCount, setDeviceCounts] = useState(null);
  const [devices, setDevices] = useState([]);
  React.useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const counts = await get('devices/count');
      const devices = await get('devices');
      if (response.ok) {
        setDeviceCounts(counts.data);
        console.log("DC", devices.data);
        setDevices(devices.data);
      }
      setLoading(false)
    }
    fetchData();
  }, [])



  return (
    <View>
      <MapView
        initialRegion={{
          latitude: 20.5937,
          longitude: 78.9629,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}

        initialCamera={{
          center: {
            latitude: 20.5937,
            longitude: 78.9629,
          },
          pitch: 45,
          heading: 0,
          altitude: 1000,
          zoom: 5
        }}
        style={{
          height: height - 200,
          width: width
        }}
      >
        {
          devices.map((e, idx) => <Marker
            pinColor={e.status == 1 ? '#2E85CA' : "#454F63"}
            key={`marker-${idx}`}
            coordinate={{
              latitude: parseFloat(e.latitude),
              longitude: parseFloat(e.longitude)
            }}
            title={e.deviceId}
          >


          </Marker>)
        }
      </MapView>

      <View style={{ flexDirection: 'row', margin: 5, padding: 5, justifyContent: 'space-evenly' }}>
        <Card key={1} count={deviceCount?.active} bgColor="#2E85CA">Connected</Card>
        <Card count={3} count={deviceCount?.total} bgColor="#2897B4">Total</Card>
        <Card count={2} count={deviceCount?.inActive} bgColor="#454F63">Inactive</Card>
      </View>
    </View>
  );
}
