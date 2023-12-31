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
  ScrollView,
} from 'react-native';
import Colors from '../../constants/Colors';
import {urlHost} from '../../constants/ApiConstants';
import {useNavigation, useRoute} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {fetchAPI} from '../../constants/ApiConstants';
import MyTextInput from '../../components/MyTextInput';
import MyButton from '../../components/MyButton';

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

const BillDetailScreen: React.FC = ({}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();

  const [paymentMethod, setPaymentMethod] = useState('');

  let dataPayment = route.params.dataPayment;

  const paymentMethods = [
    {id: 1, label: 'Cash'},
    {id: 2, label: 'Momo'},
    {id: 3, label: 'Banking'},
  ];

  useEffect(() => {
    if (dataPayment.paymentMethod === 1) {
      setPaymentMethod('Cash');
    } else if (dataPayment.paymentMethod === 2) {
      setPaymentMethod('Momo');
    } else if (dataPayment.paymentMethod === 3) {
      setPaymentMethod('Banking');
    }
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <Text style={{fontSize: 20, color: Colors.black, fontWeight: '500'}}>
          Thanh toán thành công
        </Text>
        <View style={styles.card}>
          <Text style={{fontSize: 18, color: Colors.black, fontWeight: '500'}}>
            Thông tin hoá đơn
          </Text>
          {dataPayment.listChoose.length > 0 ? (
            dataPayment.listChoose.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.itemProduct}
                  onPress={() => {}}
                >
                  <View
                    style={{
                      flex: 3,
                      alignItems: 'center',
                    }}
                  >
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
                    <Text
                      style={{
                        color: Colors.black,
                        fontSize: 15,
                        fontWeight: 'bold',
                      }}
                    >
                      {item.name}
                    </Text>

                    <Text
                      style={{
                        color: Colors.black,
                        fontSize: 13,
                      }}
                    >
                      {`số lượng: ${item.quantity}`}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <Text
              style={{fontSize: 15, color: Colors.black, fontWeight: '500'}}
            >
              Không có sản phẩm nào
            </Text>
          )}
          {dataPayment.customerChoose ? (
            <Text style={styles.textStyle}>
              {`Khách hàng: ${dataPayment.customerChoose.name} - ${dataPayment.customerChoose.phone}`}
            </Text>
          ) : (
            <Text style={styles.textStyle}>
              {'Khách hàng chưa đăng ký App'}
            </Text>
          )}

          <Text style={styles.textStyle}>
            {`Vận chuyển: ${
              dataPayment.deliveryOption === 1 ? 'Take away' : 'Delivery'
            }`}
          </Text>
          <Text
            style={styles.textStyle}
          >{`Thanh toán: ${paymentMethod} `}</Text>
          <Text
            style={{
              fontSize: 16,
              color: Colors.black,
              fontWeight: 'bold',
              marginTop: 10,
            }}
          >
            {`Tổng tiền: ${dataPayment.totalBill} `}
          </Text>
        </View>

        <MyButton
          onPress={() => {
            navigation.navigate('HomeScreen');
          }}
          style={styles.buttonPayment}
          text="Quay về trang chủ"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 10,
  },
  textStyle: {
    fontSize: 15,
    color: Colors.black,
    fontWeight: '500',
    marginTop: 5,
  },
  card: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 0.5,
    borderColor: Colors.grey,
    borderRadius: 10,
  },
  buttonPayment: {
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    height: 54,
    justifyContent: 'center',
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

export default BillDetailScreen;
