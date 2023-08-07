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
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import MyDropdown from '../../components/MyDropdown';
import DropDownPicker from 'react-native-dropdown-picker';

const dataList = [
  {id: 1, name: 'Milk Tea 1', category: 'Milk Tea'},
  {id: 2, name: 'Milk Tea 2', category: 'Milk Tea'},
  {id: 3, name: 'Cafe 1', category: 'Cafe'},
  {id: 4, name: 'Cafe 2', category: 'Cafe'},
  // Add more items as needed
];

const ListProduct: React.FC = ({}) => {
  const navigation = useNavigation();

  const [data, setData] = useState();
  const [filteredData, setFilteredData] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [category, setCategory] = useState();
  const [nameCategory, setNameCategory] = useState('');

  const dispatch = useDispatch();
  const {isLoading} = useSelector((state: RootState) => state.employee);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // dispatch(isFetching());
    await fetch(`${urlHost}/api/products`)
      .then(response => response.json())
      .then(responseData => {
        console.log('responseListProducts', responseData);
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
        style={styles.itemProduct}
        onPress={() => {
          // navigation.navigate('InfoCustomer', {data: item});
        }}
      >
        <View style={{flex: 3, alignItems: 'center'}}>
          <Image
            style={styles.imageView}
            source={{
              uri: item.images,
            }}
          />
        </View>
        <View
          style={{
            flex: 7,
            flexDirection: 'column',
            marginBottom: 10,
            marginLeft: 5,
            marginRight: 15,
          }}
        >
          <Text style={{color: Colors.black, fontSize: 17, fontWeight: 'bold'}}>
            {item.name}
          </Text>
          <Text style={{color: Colors.black, fontSize: 15}}>
            {`giá: ${item.price}`}
          </Text>
          <Text style={{color: Colors.black, fontSize: 15}}>
            {`số lượng: ${item.quantity}`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategorySelect = category => {
    setSelectedCategory(category);
  };

  const filterDataHandle = values => {
    if (values === 'All' && data) {
      setFilteredData(data);
    } else if (values !== 'All' && data) {
      const filter = data.filter(item => item.category === values);
      setFilteredData(filter);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
      }}
    >
      <MyDropdown
        isOpen={isOpenDropDown}
        onPress={() => {
          setIsOpenDropDown(!isOpenDropDown);
        }}
        placeholder="Chọn loại sản phẩm"
        itemDrops={[
          {label: 'Tất cả', value: 'All'},
          {label: 'Milk Tea', value: 'Milktea'},
          {label: 'Cafe', value: 'Cafe'},
        ]}
        showTickIcon
        onSelectItemValues={values => {
          setIsOpenDropDown(!isOpenDropDown);
          handleCategorySelect(values);
          filterDataHandle(values);
        }}
        value={selectedCategory}
      />

      <FlatList
        refreshControl={
          <RefreshControl
            tintColor={Colors.black}
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
        data={filteredData}
        renderItem={renderItem}
      />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddProduct');
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
  itemProduct: {
    flexDirection: 'row',
    marginVertical: 10,
    borderRadius: 10,
  },
  imageView: {
    height: 100,
    width: 100,
    borderRadius: 10,
    resizeMode: 'contain',
    backgroundColor: Colors.grey,
  },
});

export default ListProduct;
