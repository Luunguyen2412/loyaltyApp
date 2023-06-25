import React from 'react';
import { View, Text } from 'react-native';
import MyHeader from '../../components/MyHeader';
import MyListFunction from '../../components/ListFunction';

const listFunction = [
  {
    id: 1,
    name: 'Add Employee',
    navigate: 'ListEmployee',
  },
  {
    id: 2,
    name: 'Time Attendance',
    navigate: '',
  },
  {
    id: 3,
    name: 'Salary management',
    navigate: '',
  },
];

const EmployeeManagement: React.FC = ({ navigation }) => {
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
