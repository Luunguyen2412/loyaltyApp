import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import MyTextInput from '../../components/MyTextInput';
import Colors from '../../constants/Colors';
import MyButton from '../../components/MyButton';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {useNavigation, useRoute} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

let width = Dimensions.get('window').width;

const PriceHeaderBar = ({lable, price}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
      }}
    >
      <Text
        style={{
          color: Colors.PRIMARY04,
          fontWeight: '500',
          fontSize: 16,
        }}
      >
        {lable}
      </Text>
      <Text
        style={{
          color: Colors.PRIMARY04,
          fontWeight: '500',
          fontSize: 16,
        }}
      >
        {price}
      </Text>
    </View>
  );
};

const RadioButton = ({label, checked, onPress, style}) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <View style={[styles.radio, checked ? styles.checked : styles.unchecked]}>
        {checked && <View style={styles.dot} />}
      </View>
      <Text
        style={{
          marginLeft: 10,
          fontWeight: '500',
          fontSize: 16,
          color: Colors.black,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const PaymentScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const data = route.params.data;
  const [search, setSearch] = useState('');

  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState(null);

  const [selectedPayment, setSelectedPayment] = useState(null);

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '90%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleSelectDeliveryPress = option => {
    setSelectedDeliveryOption(option);
  };

  const handleSelectPayment = option => {
    setSelectedPayment(option);
  };

  const deliveryOptions = [
    {id: 1, label: 'Take away'},
    {id: 2, label: 'Delivery'},
  ];

  const paymentMethods = [
    {id: 1, label: 'Cash'},
    {id: 2, label: 'Momo'},
    {id: 3, label: 'Banking'},
  ];

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity style={styles.itemProduct} onPress={() => {}}>
        <View
          style={{
            flex: 3,
            alignItems: 'center',
          }}
        >
          <Image
            style={styles.imageView}
            source={{
              uri: item.item.strDrinkThumb,
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
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            {item.item.strIngredient2}
          </Text>
          <Text
            style={{
              color: Colors.black,
              fontSize: 16,
            }}
          >
            {`id: ${item.item.price}`}
          </Text>
          <Text
            style={{
              color: Colors.black,
              fontSize: 16,
            }}
          >
            {`so luong: ${item.item.quantity}`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <BottomSheetModalProvider>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
        }}
      >
        <ScrollView
          style={{
            flex: 1,
            paddingHorizontal: 20,
            paddingTop: 10,
          }}
        >
          <FlatList data={data} renderItem={renderItem} />

          <View style={styles.card}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <MyTextInput
                style={styles.searchCustomer}
                placeholder={'Tìm kiếm Khách hàng'}
                value={search}
                onChangeText={value => {
                  // setSearch(value);
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  // searchItem(search);
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
            <MyButton
              style={styles.buttonAddCustomer}
              text="Thêm khách hàng"
              onPress={handlePresentModalPress}
            />
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={1}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                }}
              >
                <Text>Awesome 🎉</Text>
              </View>
            </BottomSheetModal>
          </View>

          <View style={styles.card}>
            <Text
              style={{
                color: Colors.black,
                fontWeight: '500',
                fontSize: 18,
              }}
            >
              Delivery Option
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                paddingTop: 10,
              }}
            >
              {deliveryOptions.map(option => (
                <RadioButton
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginRight: 20,
                  }}
                  key={option.id}
                  label={option.label}
                  checked={selectedDeliveryOption === option.id}
                  onPress={() => handleSelectDeliveryPress(option.id)}
                />
              ))}
            </View>
          </View>

          <View style={styles.card}>
            <Text
              style={{
                color: Colors.black,
                fontWeight: '500',
                fontSize: 18,
              }}
            >
              Order Summary
            </Text>
            <PriceHeaderBar lable={'Subtotals'} price={'80.000'} />
            <PriceHeaderBar lable={'Discount'} price={'0.000'} />

            <PriceHeaderBar lable={'Delivery Charges'} price={'20.000'} />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 10,
              }}
            >
              <Text
                style={{
                  color: Colors.black,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}
              >
                Order Total
              </Text>
              <Text
                style={{
                  color: Colors.black,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}
              >
                100.000
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text
              style={{
                color: Colors.black,
                fontWeight: '500',
                fontSize: 18,
              }}
            >
              Payment Method
            </Text>
            <View
              style={{
                justifyContent: 'flex-start',
              }}
            >
              {paymentMethods.map(option => (
                <RadioButton
                  style={{
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    marginTop: 10,
                  }}
                  key={option.id}
                  label={option.label}
                  checked={selectedPayment === option.id}
                  onPress={() => handleSelectPayment(option.id)}
                />
              ))}
            </View>
          </View>
          <MyButton style={styles.buttonPayment} text="Thanh toán" />

          <View style={{height: 20}} />
        </ScrollView>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
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
  searchCustomer: {
    paddingHorizontal: 10,
    alignItems: 'center',
    borderWidth: 1,
    flexDirection: 'row',
    height: 50,
    width: width * 0.7,
    borderRadius: 10,
    borderColor: Colors.grey,
    marginBottom: 15,
    color: Colors.black,
  },
  buttonAddCustomer: {
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

  // containerRadioButton: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   marginRight: 20,
  // },
  radio: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: Colors.PRIMARY04,
    borderRadius: 20,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    borderColor: 'red',
  },
  unchecked: {
    borderColor: Colors.PRIMARY04,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'red',
  },
});

export default PaymentScreen;
