import React from 'react';
import { View, StatusBar } from 'react-native';
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
      <View
        style={{
          flex: 1,
          height: '100%'
        }}>
        <StatusBar
          translucent={true}
          barStyle="light-content"
          backgroundColor='#000000'
        />
        <AppNavigator />

      </View>
    </Provider>
  );
}
