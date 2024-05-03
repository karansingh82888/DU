import React, { Component } from 'react';

import { Provider } from 'react-redux';
import {
  StyleSheet,
  View,
} from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from './src/redux';
import persistStore from 'redux-persist/es/persistStore';
import Router from './src/screens/Router';


const App = () => {
  const persistor = persistStore(store);

    return (
      <>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Router />
          </PersistGate>
        </Provider>
      </>
    );
  
};

export default App;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
});