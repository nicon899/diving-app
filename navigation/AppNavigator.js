import React from 'react';
import Text from 'react-native'
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
    FindDive: { screen: createStackNavigator({ LookUpScreen }) },
    FindNumber: { screen: createStackNavigator({ FindeNumberScreen }) },
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
    MyDives: {
      screen: createStackNavigator({ MyDivesScreen }),
      navigationOptions: {
        drawerLabel: 'Meine Sprünge  ',
      },
    },
    LookUp: {
      screen: LookUpNavigator,
      navigationOptions: {
        drawerLabel: 'Sprung Lexikon  ',
      }
    },
    Learn: {
      screen: LearnNavigator,
      navigationOptions: {
        drawerLabel: 'Sprungnummern lernen   ',
      }
    },
  }
);


export default createAppContainer(AppNavigator);