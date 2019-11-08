import React from 'react';
import {
  createAppContainer
} from 'react-navigation';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';


import FindeNumberScreen from '../screens/FindeNumberScreen';
import LookUpScreen from '../screens/LookUpScreen';
import LearnDivesScreen from '../screens/LearnDivesScreen';
import MyDivesScreen from '../screens/MyDivesScreen';
import LearnDivesInfoScreen from '../screens/LearnDivesInfoScreen';
import QuizScreen from '../screens/QuizScreen'

const LearnNavigator = createStackNavigator(
  {
    Main: LearnDivesScreen,
    Info: LearnDivesInfoScreen,
    Quiz: QuizScreen,
  }
);

const LookUpNavigator = createBottomTabNavigator(
  {
    FindNumber: FindeNumberScreen,
    FindDive: LookUpScreen
  }
);

const AppNavigator = createDrawerNavigator(
  {
    MyDives: MyDivesScreen,
    LookUp: LookUpNavigator,
    Learn: LearnNavigator
  }
);

export default createAppContainer(AppNavigator);
