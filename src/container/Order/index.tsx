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
  Dimensions,
} from 'react-native';
import Colors from '../../constants/Colors';
import {urlHost} from '../../constants/ApiConstants';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {fetchAPI} from '../../constants/ApiConstants';
import MyTextInput from '../../components/MyTextInput';

let width = Dimensions.get('window').width;

const dataPayment = {
  idPayment: 1,
  staff: '',
  totalBill: 0,
  note: '',
  deliveryOption: 0,
  paymentMethod: 0,
  customerChoose: {},
  listChoose: [],
};

const OrderScreen: React.FC = ({}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [priceProduct, setPriceProduct] = useState(0);
  const [quantityProduct, setQuantityProduct] = useState(0);
  const [search, setSearch] = useState('');

  const [billPrice, setBillPrice] = useState(0);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchData();
    dataPayment.listChoose = [];
    dataPayment.totalBill = billPrice;
  }, []);

  const fetchData = async () => {
    await fetchAPI({
      url: `${urlHost}/api/products`,
    })
      .then(responseData => {
        console.log('responseListProducts', responseData);
        setData(responseData);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const searchItem = name => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
      .then(response => response.json())
      .then(responseData => {
        // console.log('responseSearch', responseData);
        setData(responseData.drinks);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const onChangePrice = price => {
    setQuantityProduct(quantityProduct + 1);
    setPriceProduct(priceProduct + price);
    setBillPrice(billPrice + price);
  };

  const addItemToCart = item => {
    const newItem = {item};
    dataPayment.listChoose.push(newItem);
  };

  const increaseQuantity = index => {
    const updatedItems = [...data];
    updatedItems[index].quantity += 1;
    // updatedItems[index].price += updatedItems[index].price;

    setData(updatedItems);
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity style={styles.itemProduct} onPress={() => {}}>
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
          <TouchableOpacity
            onPress={() => {
              onChangePrice(item.price);
              increaseQuantity(index);
              addItemToCart(item);
            }}
            style={styles.buttonAdd}
          >
            <FontAwesome5 name={'plus'} size={14} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingTop: 10,
        }}
      >
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <MyTextInput
            style={{
              paddingHorizontal: 10,
              alignItems: 'center',
              borderWidth: 1,
              flexDirection: 'row',
              height: 50,
              width: width * 0.75,
              borderRadius: 10,
              borderColor: Colors.grey,
              marginBottom: 15,
              color: Colors.black,
            }}
            placeholder={'Tìm kiếm'}
            value={search}
            onChangeText={value => {
              setSearch(value);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              searchItem(search);
            }}
            style={{
              justifyContent: 'center',
              paddingHorizontal: 15,
              height: 50,
              backgroundColor: Colors.PRIMARY,
              borderRadius: 10,
            }}
          >
            <FontAwesome5 name={'search'} size={16} color={Colors.white} />
          </TouchableOpacity>
        </View>
        <FlatList data={data} renderItem={renderItem} />
      </View>

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 60,
          // backgroundColor: Colors.grey,
          paddingHorizontal: 20,
          flexDirection: 'row',
        }}
      >
        <Text
          style={{
            color: Colors.black,
            fontSize: 20,
            fontWeight: 'bold',
          }}
        >
          {`Tổng giá: ${billPrice}`}
        </Text>
        <TouchableOpacity
          onPress={() => {
            dataPayment.totalBill = billPrice;

            navigation.navigate('Payment', {
              dataPayment: dataPayment,
            });
          }}
          style={{
            justifyContent: 'center',
            paddingHorizontal: 10,
            height: 40,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 60,
          }}
        >
          <Text style={{color: Colors.white, fontSize: 18}}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonAdd: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    position: 'absolute',
    bottom: 10,
    right: 0,
    height: 35,
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

export default OrderScreen;
