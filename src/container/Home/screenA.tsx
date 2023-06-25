import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { logOut } from '../Login/reducer';
import Colors from '../../constants/colors';
import MyHeader from '../../components/MyHeader';

const listModule = [
  {
    id: 1,
    name: 'Employee Management',
    navigate: 'EmployeeManage',
  },
  {
    id: 2,
    name: 'Expenses Management',
    navigate: '',
  },
  {
    id: 3,
    name: 'Client management',
    navigate: '',
  },
  {
    id: 4,
    name: 'File Management',
    navigate: '',
  },
];

const ScreenA: React.FC = ({ navigation }) => {
  const dispatch = useDispatch();

  const navigateToScreenB = () => {
    navigation.navigate('ScreenB');
  };

  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:5001/api/contacts')
      .then(response => response.json())
      .then(responseData => {
        console.log('response', responseData);

        setData(responseData);
      })
      .catch(error => {
        console.error(error);
      });
  };

  {
    /* {data ? (
        <Text>Data: {JSON.stringify(data)}</Text>
      ) : (
        <Text>Loading data...</Text>
      )}
      <Button title="Go to Screen B" onPress={navigateToScreenB} />
      <Button title="Log Out" onPress={onLogOut} /> */
  }

  const RenderModule = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 5,
        }}
      >
        {listModule.map((ele, index) => {
          return (
            <TouchableOpacity
              key={index.toString()}
              style={[
                {
                  width: 160,
                  height: 128,
                  borderRadius: 10,
                  backgroundColor: Colors.white,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 10,
                },
                {
                  shadowColor: '#171717',
                  shadowOffset: { width: -2, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                },
              ]}
              onPress={() => navigation.navigate(ele.navigate)}
            >
              <Text
                style={{
                  color: Colors.black,
                  fontSize: 16,
                  fontWeight: '500',
                }}
              >
                {ele.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const onLogOut = () => {
    dispatch(logOut());
  };

  return (
    <View style={{ flex: 1 }}>
      <MyHeader nameTitle={'HRM Management'} />
      <View style={{ paddingHorizontal: 20, paddingTop: 15 }}>
        <RenderModule />
      </View>
    </View>
  );
};

export default ScreenA;
