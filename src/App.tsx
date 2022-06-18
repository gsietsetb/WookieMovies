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
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {uiKit} from './styles/ui';
import {useObserver} from 'mobx-react';
import {palette} from './styles/colors';
import {CustomNavigator} from './routes';
import C from 'consistencss';

uiKit();

console.log = () => {};
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? palette.dark : palette.white,
  };

  return useObserver(() => (
    <SafeAreaView style={[backgroundStyle, C.flex]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <CustomNavigator />
    </SafeAreaView>
  ));
};

export default App;
