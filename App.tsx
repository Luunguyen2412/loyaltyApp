/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {Component, useState} from 'react';
import {StatusBar, useColorScheme, View, LogBox} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import 'react-native-gesture-handler';
import AppNavigation from './src/navigation';
import {store} from './src/store';
import {Provider} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppConsumer, AppProvider} from './src/AppProvider';
LogBox.ignoreAllLogs();

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <GestureHandlerRootView style={{flex: 1}}>
        <SafeAreaProvider>
          <View
            style={{
              backgroundColor: 'whitesmoke',
              justifyContent: 'center',
              flex: 1,
            }}
          >
            <StatusBar
              barStyle="dark-content"
              translucent
              backgroundColor="transparent"
            />
            <BottomSheetModalProvider>
              <Provider store={store}>
                <AppProvider {...this.props}>
                  <AppConsumer>
                    {funcs => {
                      global.props = {...funcs};
                      return <AppNavigation {...funcs} />;
                    }}
                  </AppConsumer>
                </AppProvider>
                {/* <AppNavigation /> */}
                {/* <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
              /> */}
              </Provider>
            </BottomSheetModalProvider>
          </View>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    );
  }
}

export default App;
