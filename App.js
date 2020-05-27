import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './src/navigators/MainStack';
import Home from './src/Pages/Home'
import MainTab from './src/navigators/MainTab';

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <MainTab />
      </NavigationContainer>
    );
  }
}

export default App;
