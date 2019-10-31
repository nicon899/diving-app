import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import divesReducer from './store/reducers/dives';

const rootReducer = combineReducers({
  dives: divesReducer,
});
const store = createStore(rootReducer);


export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
