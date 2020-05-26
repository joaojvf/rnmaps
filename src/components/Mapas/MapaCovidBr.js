import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Search from '../Search'
import axios from 'axios';

import generalStyles from './styles'

const MapaCovidBr = props => {
  const [regiao, setRegiao] = useState({});
  const [regiaoBuscada, setRegiaoBuscada] = useState({
    latitude: 28.0339,
    longitude: 1.6596,
    latitudeDelta: 60,
    longitudeDelta: 60,
  });

  const [corpoModal, setCorpoModal] = useState({
    confirmed: 0,
    deaths: 0,
  });

  async function retornoPorCidade() {
    const res = await axios(
      'https://brasil.io/api/dataset/covid19/caso/data?is_last=True&city=' +
        regiaoBuscada.title,
    );
    const confirmed = res.data.results[0].confirmed;
    const deaths = res.data.results[0].deaths;

    setCorpoModal({
      confirmed,
      deaths,
    });
  }

  useEffect(() => {
    Geolocation.getCurrentPosition(
      ({coords: {latitude, longitude}}) => {
        setRegiao({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 60,
          longitudeDelta: 60,
        });
      },
      () => {},
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000,
      },
    );

    retornoPorCidade();
  }, [regiaoBuscada]);

  handlerLocationSelect = (data, {geometry}) => {
    const {
      location: {lat: latitude, lng: longitude},
    } = geometry;
    setRegiaoBuscada({
      latitude,
      longitude,
      title: data.structured_formatting.main_text,
    });
  };

  return (
    <View style={styles.Container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        region={regiao}
        style={styles.Map}
        zoomEnabled={true}
        showsUserLocation
        loadingEnabled>
        <Marker
          coordinate={{
            latitude: regiaoBuscada.latitude,
            longitude: regiaoBuscada.longitude,
          }}>
          <Callout>
            <View style={styles.ModalView}>
              <Text style={styles.Titulo}>{regiaoBuscada.title}</Text>
              <Text>Confirmados: {corpoModal.confirmed}</Text>
              <Text>Mortos: {corpoModal.deaths} </Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
      <Search onLocationSelected={handlerLocationSelect} />
    </View>
  );
};


const styles = StyleSheet.create({
    ...generalStyles,
  });
  
export default MapaCovidBr;
