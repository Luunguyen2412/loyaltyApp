import React, {useEffect, useState} from 'react';
import {View, Button, Text, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {logOut} from '../Login/reducer';
import Colors from '../../constants/Colors';
import MyHeader from '../../components/MyHeader';
import MyListModule from '../../components/ListModule';
import {useNavigation} from '@react-navigation/native';

const listModule = [
  {
    id: 1,
    name: 'Employee\nManagement',
    navigate: 'EmployeeManage',
    icon: 'user',
  },
  {
    id: 2,
    name: 'Order\nProducts',
    navigate: 'OrderScreen',
    icon: 'wallet',
  },
  {
    id: 3,
    name: 'Customer\nmanagement',
    navigate: 'ListCustomer',
    icon: 'users',
  },
  {
    id: 4,
    name: 'File\nManagement',
    navigate: '',
    icon: 'file',
  },
];

const HomeScreen: React.FC = ({}) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  return (
    <View style={{flex: 1}}>
      {/* <MyHeader nameTitle={'HRM Management'} /> */}
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 15,
        }}
      >
        <MyListModule listModule={listModule} navigation={navigation} />
      </View>
    </View>
  );
};

export default HomeScreen;
