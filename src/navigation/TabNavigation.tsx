import * as React from 'react';
import { Appearance } from 'react-native-appearance';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScreenA from '../container/screenA';
import ScreenC from '../container/screenC';

import SvgHome from '../assets/icons/Svg.Home';
import SvgPages from '../assets/icons/Svg.Pages';

const Tab = createBottomTabNavigator();

const TabNavigation: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2a2a2a',
        tabBarInactiveTintColor: '#d0ccd0',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopColor: 'gray',
        },
        tabBarItemStyle: {
          // backgroundColor: 'blue'
        },
      }}
    >
      <Tab.Screen
        name="ScreenA"
        component={ScreenA}
        options={{
          tabBarIcon: ({ focused }) => <SvgHome active={focused} />,
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="ScreenC"
        component={ScreenC}
        options={{
          tabBarIcon: ({ focused }) => <SvgPages active={focused} />,
          tabBarLabel: 'Multi',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
