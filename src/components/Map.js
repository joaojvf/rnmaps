import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Search from './Search';

class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      region: null,
    };
  }

   componentDidMount() {
console.log("Carregando mapa...")    ;

    Geolocation.getCurrentPosition(
        ({coords: {latitude, longitude}}) => {
          this.setState({
            region: {
              latitude,
              longitude,
              latitudeDelta: 60,
              longitudeDelta: 60,
            },
          });
        },
        () => {},
        {
          timeout: 2000,
          enableHighAccuracy: true,
          maximumAge: 1000,
        },
      );
    fetch(
      'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest',
    )
      .then(response => response.json())
      .then(data => this.setState({data}));
  }

  render() {
      const region = this.state.region;
    return (
      <View style={styles.Container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          region={region}
          style={styles.Map}
          zoomEnabled={true}
          showsUserLocation
          loadingEnabled
          >
          {this.state.data.map((api, key) => {
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
        <Search />
      </View>
    );
  }
}

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
