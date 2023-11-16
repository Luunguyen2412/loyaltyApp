/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {Component, useState} from 'react';
import {StatusBar, useColorScheme, View, LogBox} from 'react-native';
import 'react-native-gesture-handler';
import AppNavigation from './src/navigation';
import {store} from './src/store';
import {Provider} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppConsumer, AppProvider} from './src/AppProvider';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import PushNotification, {Importance} from 'react-native-push-notification';

LogBox.ignoreAllLogs();

class App extends Component {
  constructor(props) {
    super(props);
  }

  createChannel = channelId => {
    PushNotification.createChannel(
      {
        channelId: channelId, // (required)
        channelName: 'My channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  };

  showNotification = (channelId, options) => {
    PushNotification.localNotification({
      /* Android Only Properties */
      channelId: channelId, // (required) channelId, if the channel doesn't exist, notification will not trigger.
      largeIconUrl: 'ic_launcher', // (optional) default: undefined
      smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
      bigText: 'My big text that will be shown when notification is expanded. ', // (optional) default: "message" prop
      subText: 'This is a subText', // (optional) default: none
      bigPictureUrl: '', // (optional) default: undefined
      bigLargeIcon: '', // (optional) default: undefined
      bigLargeIconUrl: '', // (optional) default: undefined
      color: 'red', // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      ongoing: false, // (optional) set whether this is an "ongoing" notification
      priority: 'high', // (optional) set notification priority, default: high
      actions: ['Yes', 'No'], // (Android only) See the doc for notification actions to know more
      invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

      title: options.title, // (optional)
      message: options.message, // (required)
    });
  };

  componentDidMount() {
    messaging()
      .getToken(firebase.app().options.messagingSenderId)
      .then(token => {
        console.log('tokennnn', token);
      });

    const unsubscribe = messaging().onMessage(async remoteMsg => {
      const channelId = Math.random()
        .toString(36)
        .substring(7);
      this.createChannel(channelId);
      this.showNotification(channelId, {
        // bigImage: remoteMsg.notification?.android?.imageUrl,
        title: remoteMsg.notification?.title,
        message: remoteMsg.notification?.body,
      });
      console.log('remoteMsg ', remoteMsg);
    });
    messaging().setBackgroundMessageHandler(async remoteMsg => {
      console.log('remoteMsg Background ', remoteMsg);
    });

    return unsubscribe;
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
