import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import Colors from '../../constants/Colors';
import {urlHost} from '../../constants/ApiConstants';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';

const HistoryOrder: React.FC = ({}) => {
  const navigation = useNavigation();

  const [data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const {isLoading} = useSelector((state: RootState) => state.employee);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // dispatch(isFetching());
    await fetch(`${urlHost}/api/bills`)
      .then(response => response.json())
      .then(responseData => {
        console.log('responseHistoryOrder', responseData);
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
          paddingVertical: 10,
          backgroundColor: Colors.white,
          marginVertical: 10,
          borderRadius: 10,
          borderWidth: 1,
          borderBottomColor: Colors.PRIMARY04,
        }}
        onPress={() => {
          // navigation.navigate('InfoCustomer', {data: item});
        }}
      >
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: 10,
          }}
        >
          {item.customerChoose ? (
            <Text style={{color: Colors.black}}>
              {item.customerChoose.name}
            </Text>
          ) : (
            <Text style={{color: Colors.black}}>Khach chua dang ky</Text>
          )}
          {item.customerChoose && (
            <Text style={{color: Colors.PRIMARY04}}>
              {item.customerChoose.phone}
            </Text>
          )}

          <Text style={{color: Colors.black, fontSize: 16}}>
            {'Total: ' + item.totalBill}
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
  );
};

const styles = StyleSheet.create({});

export default HistoryOrder;
