import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,
} from 'react-native';
import Colors from '../../constants/Colors';

const ListEmployee: React.FC = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://192.168.1.10:5001/api/contacts')
      .then(response => response.json())
      .then(responseData => {
        console.log('response', responseData);

        setData(responseData);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const refreshData = () => {
    setTimeout(() => {
      setRefreshing(false);
      fetchData();
    }, 2000);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    refreshData();
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          height: 56,
          backgroundColor: Colors.white,
          marginVertical: 10,
          borderRadius: 10,
          borderWidth: 1,
          borderBottomColor: Colors.PRIMARY04,
        }}
        onPress={() => {
          navigation.navigate('AddEmployee', { data: item });
        }}
      >
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            style={{
              height: 40,
              width: 40,
              borderRadius: 40,
              backgroundColor: 'gray',
            }}
            // source={{ uri: 'ic_employee' }}
            resizeMode="contain"
          />
        </View>

        <View
          style={{
            flex: 8,
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: Colors.black }}>{item.name}</Text>
          <Text style={{ color: Colors.PRIMARY04 }}>{item.phone}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
      }}
    >
      <View style={{}}>
        <FlatList
          refreshControl={
            <RefreshControl
              tintColor={Colors.black}
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
          data={data}
          renderItem={renderItem}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddEmployee');
        }}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: 60,
          position: 'absolute',
          bottom: 50,
          right: 30,
          height: 60,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 100,
        }}
      />
    </View>
  );
};

export default ListEmployee;
