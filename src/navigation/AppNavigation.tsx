import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigation from './TabNavigation';
import ScreenB from '../container/Home/screenB';
import EmployeeManagement from '../container/Employee';
import ListEmployee from '../container/Employee/ListEmployee';
import AddEmployee from '../container/Employee/AddEmployee';
import Colors from '../constants/Colors';

const Stack = createNativeStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabNavigation"
        component={TabNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="ScreenB" component={ScreenB} />
      <Stack.Screen
        name="EmployeeManage"
        component={EmployeeManagement}
        options={{
          title: 'Manage Employee',
          headerTintColor: Colors.white,
          headerStyle: {
            backgroundColor: Colors.PRIMARY,
          },
        }}
      />
      <Stack.Screen
        name="ListEmployee"
        component={ListEmployee}
        options={{
          title: 'List Employee',
          headerTintColor: Colors.white,
          headerStyle: {
            backgroundColor: Colors.PRIMARY,
          },
        }}
      />
      <Stack.Screen
        name="AddEmployee"
        component={AddEmployee}
        options={{
          title: 'Add Employee',
          headerTintColor: Colors.white,
          headerStyle: {
            backgroundColor: Colors.PRIMARY,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
