import {AppRegistry} from 'react-native';
import Map from './src/components/Map';
import React from 'react'
import 'react-native-gesture-handler';
import App from './App'

// import App from './App';
 import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
