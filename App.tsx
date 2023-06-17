/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme, View, LogBox } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import 'react-native-gesture-handler';
import AppNavigation from './src/navigation';
import { store } from './src/store';
import { Provider } from 'react-redux';
LogBox.ignoreAllLogs();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View
      style={{
        backgroundColor: 'whitesmoke',
        justifyContent: 'center',
        flex: 1,
      }}
    >
      <Provider store={store}>
        <AppNavigation />
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
      </Provider>
    </View>
  );
}

export default App;
