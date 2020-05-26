import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Search from './Search';
import axios from 'axios';

const Map = props => {
  const [data, setData] = useState();
  const [regiao, setRegiao] = useState({});
  const [regiaoBuscada, setRegiaoBuscada] = useState({
    latitude: 28.0339,
    longitude: 1.6596,
    latitudeDelta: 60,
    longitudeDelta: 60,
  });

  const [corpoModal, setCorpoModal] = useState({
    confirmed: 1,
        deaths : 1,
  });
  const [buscarPorCidade, setBuscarPorCidade] = useState(false);

  async function retornoPorPais() {
    const res = await axios(
      'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest',
    );
    if (res) {
      setData(res.data);
    }
  }

  async function retornoPorCidade() {
    const res = await axios(
      'https://brasil.io/api/dataset/covid19/caso/data?is_last=True&city=' +
        regiaoBuscada.title,
    );
    if (res) {
      const confirmed = res.data.results[0].confirmed
      const deaths = res.data.results[0].deaths

      setCorpoModal({
        confirmed,
        deaths
      });
    }
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

    if (buscarPorCidade) {
      retornoPorCidade();
    } else {
      retornoPorPais();
    }
  }, [buscarPorCidade]);

  handlerLocationSelect = (data, {geometry}) => {
    const {
      location: {lat: latitude, lng: longitude},
    } = geometry;
    setRegiaoBuscada({
      latitude,
      longitude,
      title: data.structured_formatting.main_text,
    });
    setBuscarPorCidade(true);
  };

  const titulo = buscarPorCidade ? regiaoBuscada.title : 'Teste';
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

          <Marker
            coordinate={{
              latitude: buscarPorCidade ? regiaoBuscada.latitude : 0,
              longitude: buscarPorCidade ? regiaoBuscada.longitude : 0,
            }}>
            <Callout>
              <View style={styles.ModalView}>
                <Text style={styles.Titulo}>{titulo}</Text>
                <Text>Confirmados: {corpoModal.confirmed}</Text>
                <Text>Mortos: {corpoModal.deaths} </Text>
              </View>
            </Callout>
          </Marker>
          // data.map((api, key) => {
          //   if (api.confirmed) {
          //     return (
          //       <Marker
          //         key={key}
          //         coordinate={{
          //           latitude: buscarPorCidade ? regiaoBuscada.latitude : 0,
          //           longitude: buscarPorCidade ? regiaoBuscada.longitude : 0,
          //         }}>
          //         <Callout>
          //           <View style={styles.ModalView}>
          //             <Text style={styles.Titulo}>{titulo}</Text>
          //             <Text>Confirmados: {api.confirmed}</Text>
          //             <Text>Mortos: {api.deaths} </Text>
          //             <Text>Recuperados: {api.recovered}</Text>
          //           </View>
          //         </Callout>
          //       </Marker>
          //     );
          //   }
          // })
        }
      </MapView>
      <Search onLocationSelected={this.handlerLocationSelect} />
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
