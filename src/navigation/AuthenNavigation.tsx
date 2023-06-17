import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../container/Login';
import SignupScreen from '../container/Signup';

const Stack = createNativeStackNavigator();

const AuthenNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignupScreen}
        options={{
          title: 'Tạo tài khoản',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthenNavigator;
