import React from 'react';
import Map from ''

import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
} from 'react-native-maps';

class App extends React.Component {
  render(){
    return (
      <Map></Map>
    )
  }
}

export default App;
