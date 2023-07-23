import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigation from './TabNavigation';
import EmployeeManagement from '../container/Employee';
import ListEmployee from '../container/Employee/ListEmployee';
import AddEmployee from '../container/Employee/AddEmployee';
import Colors from '../constants/Colors';
import InfoEmployee from '../container/Employee/InfoEmployee';
import OrderScreen from '../container/Order';
import ListCustomer from '../container/Customer/ListCustomer';
import InfoCustomer from '../container/Customer/InfoCustomer';
import PaymentScreen from '../container/Order/Payment';
import AddCustomer from '../container/Customer/AddCustomer';
import UpdateCustomer from '../container/Customer/UpdateCustomer';
import UpdateEmployee from '../container/Employee/UpdateEmployee';

const Stack = createNativeStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabNavigation"
        component={TabNavigation}
        // options={{
        //   headerShown: false,
        // }}
        options={{
          title: 'Home Management',
          headerTintColor: Colors.white,
          headerStyle: {
            backgroundColor: Colors.PRIMARY,
          },
        }}
      />
      <Stack.Screen
        name="ListCustomer"
        component={ListCustomer}
        options={{
          title: 'List Customer',
          headerTintColor: Colors.white,
          headerStyle: {
            backgroundColor: Colors.PRIMARY,
          },
        }}
      />
      <Stack.Screen
        name="AddCustomer"
        component={AddCustomer}
        options={{
          title: 'Add Customer',
          headerTintColor: Colors.white,
          headerStyle: {
            backgroundColor: Colors.PRIMARY,
          },
        }}
      />
      <Stack.Screen
        name="UpdateCustomer"
        component={UpdateCustomer}
        options={{
          title: 'Update Customer Infomation',
          headerTintColor: Colors.white,
          headerStyle: {
            backgroundColor: Colors.PRIMARY,
          },
        }}
      />
      <Stack.Screen
        name="InfoCustomer"
        component={InfoCustomer}
        options={{
          title: 'Customer Infomation',
          headerTintColor: Colors.white,
          headerStyle: {
            backgroundColor: Colors.PRIMARY,
          },
        }}
      />
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
      <Stack.Screen
        name="InfoEmployee"
        component={InfoEmployee}
        options={{
          title: 'Employee Infomation',
          headerTintColor: Colors.white,
          headerStyle: {
            backgroundColor: Colors.PRIMARY,
          },
        }}
      />
      <Stack.Screen
        name="UpdateEmployee"
        component={UpdateEmployee}
        options={{
          title: 'Update Employee Infomation',
          headerTintColor: Colors.white,
          headerStyle: {
            backgroundColor: Colors.PRIMARY,
          },
        }}
      />
      <Stack.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={{
          title: 'Order products',
          headerTintColor: Colors.white,
          headerStyle: {
            backgroundColor: Colors.PRIMARY,
          },
        }}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{
          title: 'Payment',
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
