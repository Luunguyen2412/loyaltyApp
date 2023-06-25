import React, { useEffect, useState } from 'react';
import { View, Button, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { logOut } from '../Login/reducer';
import Colors from '../../constants/colors';
import MyHeader from '../../components/MyHeader';
import MyListModule from '../../components/ListModule';
import MyListFunction from '../../components/ListFunction';

const listModule = [
  {
    id: 1,
    name: 'Employee\nManagement',
    navigate: 'EmployeeManage',
  },
  {
    id: 2,
    name: 'Expenses\nManagement',
    navigate: '',
  },
  {
    id: 3,
    name: 'Client\nmanagement',
    navigate: '',
  },
  {
    id: 4,
    name: 'File\nManagement',
    navigate: '',
  },
];

const HomeScreen: React.FC = ({ navigation }) => {
  const dispatch = useDispatch();

  const [data, setData] = useState(null);

  useEffect(() => {
    // fetchData();
  }, []);

  // const fetchData = () => {
  //     fetch('http://localhost:3000/api/contacts')
  //         .then(response => response.json())
  //         .then(responseData => {
  //             console.log('response', responseData);

  //             setData(responseData);
  //         })
  //         .catch(error => {
  //             console.error(error);
  //         });
  // };

  return (
    <View style={{ flex: 1 }}>
      <MyHeader nameTitle={'HRM Management'} />
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 15,
        }}
      >
        <MyListModule listModule={listModule} navigation={navigation} />
        {/* <MyListFunction listFunction={listModule} navigation={navigation} /> */}
      </View>
    </View>
  );
};

export default HomeScreen;
