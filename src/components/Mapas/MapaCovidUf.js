import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Search from '../Search';
import axios from 'axios';
import Geocoder from 'react-native-geocoding';

import generalStyles from './styles';

const MapaCovidUf = props => {
  const [regiao, setRegiao] = useState(
    {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })

    const [data, setData] = useState([]);


  const [corpoModal, setCorpoModal] = useState({
    confirmed: 0,
    deaths: 0,
  });

  async function retornoPoreSTADO() {
    const res = await axios(
      'https://brasil.io/api/dataset/covid19/caso/data?is_last=True&state=' +
        "PR",
    );   
  }

  function retornaPosicaoAtual() {
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
  }

  useEffect(() => {
    retornaPosicaoAtual();
    retornoPorCidade();
  }, [regiaoBuscada]);

  const handlerLocationSelect = (data, {geometry}) => {
    const {
      location: {lat: latitude, lng: longitude},
    } = geometry;
    setRegiaoBuscada({
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      title: data.structured_formatting.main_text,
    });
  };

  return (
    <View style={styles.Container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: regiao.latitude,
          longitude: regiao.longitude,
          latitudeDelta: regiao.latitudeDelta,
          longitudeDelta: regiao.longitudeDelta,
        }}
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

export default MapaCovidUf;
