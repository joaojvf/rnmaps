import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../Pages/Home';
import About from '../Pages/About';

const MainStack = createStackNavigator();

export default () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen name="About" component={About} />
    </MainStack.Navigator>
  );
};
