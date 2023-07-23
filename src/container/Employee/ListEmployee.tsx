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
import {getListSuccess, isFetching} from './reducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';

const ListEmployee: React.FC = ({}) => {
  const navigation = useNavigation();

  const [data, setData] = useState(null);
  // const [listEmployee, setListEmployee] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const dispatch = useDispatch();
  const {isLoading} = useSelector((state: RootState) => state.employee);

  useEffect(() => {
    fetchData();
    // if (data) {
    //   const dataEmployee = data.find(e => e.position === 1);
    //   setListEmployee(dataEmployee);
    // }
  }, []);

  const fetchData = async () => {
    dispatch(isFetching());

    await fetchAPI({
      url: `${urlHost}/api/users`,
      method: 'GET',
    })
      .then(async responseData => {
        console.log('responseUserInfomation', responseData);
        dispatch(getListSuccess());
        setData(responseData);
      })
      .catch(error => {
        console.log('errorUserInfomation', error);
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
          padding: 5,
          backgroundColor: Colors.white,
          marginVertical: 5,
          borderRadius: 10,
          borderWidth: 1,
          borderBottomColor: Colors.PRIMARY04,
        }}
        onPress={() => {
          navigation.navigate('InfoEmployee', {data: item});
        }}
      >
        <View
          style={{
            flex: 3,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            style={{
              height: 100,
              width: 100,
              borderRadius: 10,
              resizeMode: 'contain',
              backgroundColor: Colors.grey,
            }}
            source={{uri: item.avatar}}
            resizeMode="contain"
          />
        </View>

        <View
          style={{
            flex: 7,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            paddingLeft: 10,
            paddingTop: 10,
          }}
        >
          <Text style={{color: Colors.black}}>{item.username}</Text>
          <Text
            style={{
              color: Colors.PRIMARY04,
            }}
          >
            {item.phone}
          </Text>
          <Text
            style={{
              color: Colors.PRIMARY04,
            }}
          >
            {item.position === 1 ? 'Admin' : 'Staff'}
          </Text>
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

      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size="large" color={Colors.PRIMARY} />
        </View>
      ) : (
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
      )}

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddEmployee');
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

export default ListEmployee;
