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
import {LogBox, SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {uiKit} from './styles/ui';
import {useObserver} from 'mobx-react';
import {CustomNavigator} from './routes';
import C from 'consistencss';
import {StoreProvider} from './store/MovieProvider';

uiKit();

LogBox.ignoreLogs(['Warning:', 'Error']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return useObserver(() => (
    <StoreProvider>
      <SafeAreaView style={[C.bgDark, C.flex]}>
        <StatusBar barStyle={'light-content'} />
        <CustomNavigator />
      </SafeAreaView>
    </StoreProvider>
  ));
};

export default App;
