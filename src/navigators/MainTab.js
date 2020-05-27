import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from '../Pages/Home';
import MapaCovidMundial from '../components/Mapas/MapaCovidMundial';
import MapaCovidBr from '../components/Mapas/MapaCovidBr';

const Tab = createMaterialBottomTabNavigator();

export default () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let icon = 'add';
          switch (route.name) {
            case 'MapaCovidBr':
              icon = 'google-maps';
              break;

            case 'MapaCovidMundial':
              icon = 'map';
              break;

            default:
              icon = 'home';
              break;
          }
          return <MaterialCommunityIcons name={icon} size={26} />;
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="MapaCovidBr"
        component={MapaCovidBr}
        options={{tabBarLabel: 'Brasil'}}
      />
      <Tab.Screen
        name="MapaCovidMundial"
        component={MapaCovidMundial}
        options={{tabBarLabel: 'Mundo'}}
      />
    </Tab.Navigator>
  );
};
