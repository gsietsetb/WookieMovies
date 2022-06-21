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
import {LogBox, SafeAreaView, StatusBar} from 'react-native';

import {bordColor, uiKit} from './styles/ui';
import {useObserver} from 'mobx-react';
import {CustomNavigator} from './routes';
import C from 'consistencss';
import {StoreProvider} from './store/MovieProvider';
import Toast, {BaseToast, BaseToastProps} from 'react-native-toast-message';
import {palette} from './styles/colors';

uiKit();

const toastConfig = {
  success: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast
      {...props}
      style={[
        bordColor(palette.softPink),
        C.radius4,
        C.bgBlack,
        {borderLeftColor: palette.salmon},
      ]}
      contentContainerStyle={C.px3}
      text1Style={[C.textWhite, C.font3]}
    />
  ),
};

LogBox.ignoreLogs(['Warning:', 'Error']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
const App = () =>
  useObserver(() => (
    <StoreProvider>
      <SafeAreaView style={[C.bgDark, C.flex]}>
        <StatusBar barStyle={'light-content'} />
        <CustomNavigator />
        <Toast config={toastConfig} />
      </SafeAreaView>
    </StoreProvider>
  ));

export default App;
