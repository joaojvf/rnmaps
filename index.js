import {AppRegistry} from 'react-native';
import Map from './src/components/Map';
import React from 'react'


const App = () => <Map/>

export default App;
// import App from './App';
 import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
