import React from 'react';
import {
  createAppContainer
} from 'react-navigation';
import Ionicons from '@expo/vector-icons';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';


import FindeNumberScreen from '../screens/FindeNumberScreen';
import LookUpScreen from '../screens/LookUpScreen';
import LearnDivesScreen from '../screens/LearnDivesScreen';
import MyDivesScreen from '../screens/MyDivesScreen';
import LearnDivesInfoScreen from '../screens/LearnDivesInfoScreen';
import QuizScreen from '../screens/QuizScreen'
import ImageIcon from '../components/ImageIcon';


const LearnNavigator = createStackNavigator(
  {
    Main: LearnDivesScreen,
    Info: LearnDivesInfoScreen,
    Quiz: QuizScreen,
  }
);

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let iconName;
  return (
    navigation.state.routeName === 'FindNumber' ?
      <ImageIcon
        source={require('../assets/images/number.png')}
        sourceFocused={require('../assets/images/numbers-focused.png')}
        focused={focused}
        style={{ width: 30, height: 30 }}
      />
      :
      <ImageIcon
        source={require('../assets/images/dive.png')}
        sourceFocused={require('../assets/images/dive-focused.png')}
        focused={focused}
        style={{ width: 30, height: 30 }}
      />
  );
};


const LookUpNavigator = createBottomTabNavigator(
  {
    FindDive: { screen: LookUpScreen },
    FindNumber: { screen: FindeNumberScreen },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) =>
        getTabBarIcon(navigation, focused, tintColor),
    }),
    tabBarOptions: {
      showLabel: false
    },
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