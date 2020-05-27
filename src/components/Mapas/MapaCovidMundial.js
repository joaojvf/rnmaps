import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import axios from 'axios';

import generalStyles from './styles';

const MapaCovidMundial = props => {
  const [data, setData] = useState([]);
  const [regiao, setRegiao] = useState(
    {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
  );

  useEffect(() => {
    Geolocation.getCurrentPosition(
      ({coords: {latitude, longitude}}) => {
        setRegiao({
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
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

    retornoPorPais();
  }, []);

  async function retornoPorPais() {
    const res = await axios(
      'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest',
    )
      .then(response => {
        console.log('Passou: ' + response.data);
        setData(response.data);
      })
      .catch(error => {
        console.log('Erro: ' + error);
      });
  }

  return (
    <View style={styles.Container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        region={regiao}
        style={styles.Map}
        zoomEnabled={true}
        showsUserLocation
        loadingEnabled>
        {data.map((api, key) => {
          if (api.confirmed) {
            return (
              <Marker
                key={key}
                coordinate={{
                  latitude: api.location.lat,
                  longitude: api.location.lng,
                }}>
                <Callout>
                  <View style={styles.ModalView}>
                    <Text style={styles.Titulo}>
                      {api.provincestate} - {api.countryregion}
                    </Text>
                    <Text>Confirmados: {api.confirmed}</Text>
                    <Text>Mortos: {api.deaths} </Text>
                    <Text>Recuperados: {api.recovered}</Text>
                  </View>
                </Callout>
              </Marker>
            );
          }
        })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  ...generalStyles,
});

export default MapaCovidMundial;
