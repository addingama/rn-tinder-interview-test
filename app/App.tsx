/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { ProfileScreen } from 'src/screens/profile/';

declare const global: {HermesInternal: null | {}};

////////////////////////////////////////////////////////////////////////////////
// INTERVIEW NOTES: START WITH THIS COMPONENT FOR YOUR IMPLEMENTATION
////////////////////////////////////////////////////////////////////////////////
const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ProfileScreen />
    </>
  );
};


export default App;
