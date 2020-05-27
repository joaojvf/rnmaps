import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Circle,
  Callout,
  Polyline,
  Polygon,
} from 'react-native-maps';
import axios from 'axios';

import generalStyles from './styles';
import {locations} from '../../Datas/Data';

const MapaTeste = props => {
  const [regiao, setRegiao] = useState({
    latitude: 24.8307323,
    longitude: 67.00210948,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [data, setData] = useState([]);

  useEffect(() => {}, []);

  return (
    <View style={styles.Container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={regiao}
        style={styles.Map}>
        {locations.map(marker => (
          
          <Polygon 
          coordinates = {locations}
          fillColor = {"#ABF"}
          />
        ))}

        {locations.map(marker => (
          <Circle
          center={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          radius={100}
          fillColor={'#A3BE80'}
        />
        ))
          
        }
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  ...generalStyles,
});

export default MapaTeste;
