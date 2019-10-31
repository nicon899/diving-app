import React from 'react';
import {
  createAppContainer
} from 'react-navigation';

import { createMaterialTopTabNavigator, createBottomTabNavigator  } from 'react-navigation-tabs';

import FindeNumberScreen from '../screens/FindeNumberScreen'
import LookUpScreen from '../screens/LookUpScreen'


const AppNavigator = createBottomTabNavigator (
  {
    FindNumber: FindeNumberScreen,
    FindDive: LookUpScreen
  }
);

export default createAppContainer(AppNavigator);
