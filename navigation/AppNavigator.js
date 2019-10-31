import React from 'react';
import {
  createAppContainer
} from 'react-navigation';

import { createMaterialTopTabNavigator  } from 'react-navigation-tabs';

import FindeNumberScreen from '../screens/FindeNumberScreen'
import LookUpScreen from '../screens/LookUpScreen'


const AppNavigator = createMaterialTopTabNavigator (
  {
    FindNumber: FindeNumberScreen,
    FindDive: LookUpScreen
  }, {
  swipeEnabled: true,
  tabBarPosition: 'bottom'
}
);

export default createAppContainer(AppNavigator);
