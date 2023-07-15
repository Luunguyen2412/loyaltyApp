import React from 'react';
import {View, Text} from 'react-native';
import MyHeader from '../../components/MyHeader';
import MyListFunction from '../../components/ListFunction';
import {useNavigation} from '@react-navigation/native';

const listFunction = [
  {
    id: 1,
    name: 'Add Employee',
    navigate: 'ListEmployee',
    icon: 'user-plus',
  },
  {
    id: 2,
    name: 'Time Attendance',
    navigate: '',
    icon: 'clock',
  },
  {
    id: 3,
    name: 'Salary management',
    navigate: '',
    icon: 'wallet',
  },
];

const EmployeeManagement: React.FC = ({}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
      }}
    >
      {/* <MyHeader nameTitle={'Emloyee Management'} /> */}
      <MyListFunction listFunction={listFunction} navigation={navigation} />
    </View>
  );
};

export default EmployeeManagement;
