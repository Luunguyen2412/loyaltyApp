import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigation from './TabNavigation';
import ScreenB from '../container/Home/screenB';
import EmployeeManagement from '../container/Employee';
import ListEmployee from '../container/Employee/ListEmployee';
import AddEmployee from '../container/Employee/AddEmployee';

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
      <Stack.Screen name="EmployeeManage" component={EmployeeManagement} />
      <Stack.Screen name="ListEmployee" component={ListEmployee} />
      <Stack.Screen name="AddEmployee" component={AddEmployee} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
