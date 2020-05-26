import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Search from './Search';
import {CasosPorCidade} from './../services/ApiCovidBr';
import axios from 'axios';

const Map = props => {

  const [data, setData] = useState([]);
  const [regiao, setRegiao] = useState('');
  const [regiaoBuscada, setRegiaoBuscada] = useState({});
  const [buscarPorCidade, setBuscarPorCidade] = useState(false);


  useEffect(async () => {
    Geolocation.getCurrentPosition(
      ({coords: {latitude, longitude}}) => {
        setRegiao(
          {
            latitude,
            longitude,
            latitudeDelta: 60,
            longitudeDelta: 60,
          }
        );
      },
      () => {},
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000,
      },
    );

    const res = null;

    if(buscarPorCidade) {
      res = await axios ('https://brasil.io/api/dataset/covid19/caso/data?is_last=True&city=' + regiaoBuscada.title)
      
    }
    else {
       res = await axios('https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest')
        setData(res.data); 
    }
    console.log(res);

       
  }, []); 

handlerLocationSelect = (data, {geometry}) => {
  const {location: {lat: latitude, lgn: longitude}} = geometry;
  setRegiaoBuscada({
    latitude,
    longitude,
    title: data.structured_formatting.main_text,
  })
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
        
        {
        data.map((api, key) => {
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
      <Search onLocationSelected ={this.handlerLocationSelect}/>
    </View>
  );
};

const styles = StyleSheet.create({
  Map: {
    flex: 1,
  },
  Titulo: {
    fontWeight: 'bold',
  },
  ModalView: {
    width: 130,
  },
  Container: {
    flex: 1,
  },
});

export default Map;
