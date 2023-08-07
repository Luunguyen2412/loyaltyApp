import React from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import MyListModule from '../../components/ListModule';
import {useNavigation} from '@react-navigation/native';

type TUserPermission = 'seeEmployeeManagement' | 'seeOrderProducts';
type TUserPosition = 1 | 2;

const userPermissions: Record<TUserPosition, TUserPermission[]> = {
  '1': ['seeEmployeeManagement'],
  '2': [],
};

const hasPermission = (
  position: TUserPosition,
  permission: TUserPermission,
) => {
  return userPermissions[position].includes(permission);
};

const listModule = [
  {
    id: 1,
    name: 'Employee\nManagement',
    navigate: 'EmployeeManage',
    icon: 'user',
    permission: 1,
  },
  {
    id: 2,
    name: 'Order\nProducts',
    navigate: 'OrderScreen',
    icon: 'wallet',
    permission: 2,
  },
  {
    id: 3,
    name: 'Customer\nmanagement',
    navigate: 'ListCustomer',
    icon: 'users',
    permission: 2,
  },
  {
    id: 4,
    name: 'Product\nManagement',
    navigate: 'ListProduct',
    icon: 'store',
    permission: 2,
  },
];

const HomeScreen: React.FC = ({}) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  return (
    <View style={{flex: 1}}>
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
