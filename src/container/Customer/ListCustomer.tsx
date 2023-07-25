import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Colors from '../../constants/Colors';
import {fetchAPI, urlHost} from '../../constants/ApiConstants';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import {getListSuccess, isFetching} from './reducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';

const ListCustomer: React.FC = ({}) => {
  const navigation = useNavigation();

  const [data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const dispatch = useDispatch();
  const {isLoading} = useSelector((state: RootState) => state.employee);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // dispatch(isFetching());
    await fetch(`${urlHost}/api/contacts`)
      .then(response => response.json())
      .then(responseData => {
        console.log('responseListCustomer', responseData);
        // dispatch(getListSuccess());
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

  const renderItem = ({item}) => {
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
          navigation.navigate('InfoCustomer', {data: item});
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
          <Text style={{color: Colors.black}}>{item.name}</Text>
          <Text style={{color: Colors.PRIMARY04}}>{item.phone}</Text>
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
      {/* <View style={{paddingTop: 10}}>
        <MyTextInput
          placeholder={'Tìm kiếm nhân viên'}
          value={searchInput}
          onChangeText={value => {
            setSearchInput(value);
          }}
        />
      </View> */}

      {/* {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size="large" color={Colors.PRIMARY} />
        </View>
      ) : ( */}
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
      {/* )} */}

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddCustomer');
        }}
        style={styles.buttonAdd}
      >
        <FontAwesome5 name={'plus'} size={20} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonAdd: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    position: 'absolute',
    bottom: 50,
    right: 30,
    height: 60,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 100,
  },
});

export default ListCustomer;
