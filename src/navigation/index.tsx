import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthenNavigator from './AuthenNavigation';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import AppNavigator from './AppNavigation';

const AppNavigation: React.FC = () => {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);

  // console.log('loginnn', isLogin);

  return (
    <NavigationContainer>
      {isLogin ? <AppNavigator /> : <AuthenNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigation;
