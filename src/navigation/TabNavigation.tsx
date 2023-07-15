import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SvgHome from '../assets/icons/Svg.Home';
import SvgPages from '../assets/icons/Svg.Pages';
import colors from '../constants/Colors';
import HomeScreen from '../container/Home';
import ProfileScreen from '../container/Profile';

const Tab = createBottomTabNavigator();

const TabNavigation: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.darkColor,
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
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => <SvgHome active={focused} />,
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => <SvgPages active={focused} />,
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
