import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import Colors from '../../constants/Colors';
import MyTextInput from '../../components/MyTextInput';
import MyButton from '../../components/MyButton';
import {fetchAPI, urlHost} from '../../constants/ApiConstants';
import {useNavigation} from '@react-navigation/native';
import MyDropdown from '../../components/MyDropdown';
import ImagePicker from 'react-native-image-crop-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

let width = Dimensions.get('window').width;

const AddProduct: React.FC = ({}) => {
  const navigation = useNavigation();

  const [images, setImages] = useState('');

  const [productName, setProductName] = useState('');
  const [productDetail, setProductDetail] = useState('');
  const [isValidate, setIsValidate] = useState(false);
  const [msgError, setMsgError] = useState('');
  const [category, setCategory] = useState(); // 1 - Milktea, 2 - Cafe

  const [productPrice, setProductPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);

  const _AddProduct = async (name, detail, cateGory, price, quanTity) => {
    if (name === '' || price === '') {
      setIsValidate(true);
    }

    const body = {
      name: name,
      images:
        'https://product.hstatic.net/1000075078/product/1639377904_bac-siu_d2f15fb7fa024b528c6e9259f6637c9e.jpg',
      category: cateGory,
      detail: detail,
      price: price,
      quantity: quanTity,
    };

    await fetchAPI({
      url: `${urlHost}/api/products`,
      data: body,
      method: 'POST',
    })
      .then(async responseData => {
        console.log('responseAddProduct', responseData);
        navigation.navigate('ListProduct');
      })
      .catch(error => {
        console.log('errorAddProduct', error);
      });
  };

  const handlePickImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log('imageeee', image);
      setImages(image.path);
    });
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="always"
      keyboardDismissMode="on-drag"
      bounces={false}
      overScrollMode="always"
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      enableOnAndroid
      enableAutomaticScroll
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <View style={styles.container}>
        <View
          style={{
            flex: 8,
            paddingTop: 20,
          }}
        >
          <View
            style={{
              paddingBottom: 15,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Image
              style={styles.avatarContainer}
              source={{uri: images}}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={styles.buttonPickImg}
              onPress={() => handlePickImage()}
            >
              <Text
                style={{fontSize: 14, color: Colors.white, fontWeight: '500'}}
              >
                Chọn ảnh từ thư viện
              </Text>
            </TouchableOpacity>
          </View>
          <MyTextInput
            placeholder="Nhập tên sản phảm"
            value={productName}
            onChangeText={value => {
              setProductName(value);
              setIsValidate(false);
            }}
          />
          <MyTextInput
            placeholder="Nhập chi tiết sản phảm"
            value={productName}
            onChangeText={value => {
              setProductDetail(value);
              setIsValidate(false);
            }}
          />
          <MyTextInput
            placeholder="Nhập giá sản phảm"
            value={productName}
            onChangeText={value => {
              setProductPrice(value);
              setIsValidate(false);
            }}
          />

          <MyDropdown
            isOpen={isOpenDropDown}
            onPress={() => {
              setIsOpenDropDown(!isOpenDropDown);
            }}
            placeholder="Chọn loại sản phẩm"
            itemDrops={[
              {label: 'Milktea', value: 1},
              {label: 'Cafe', value: 2},
            ]}
            showTickIcon
            onSelectItemValues={values => {
              setIsOpenDropDown(!isOpenDropDown);
              setCategory(values);
            }}
            value={category}
          />
          {isValidate ? (
            <View
              style={{
                height: 50,
                alignItems: 'center',
              }}
            >
              <Text style={{color: 'red'}}>Vui lòng điền thông tin đầy đủ</Text>
            </View>
          ) : (
            <View style={{height: 50}} />
          )}
        </View>
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <MyButton
            style={styles.button}
            text="Lưu"
            onPress={() => {
              _AddProduct(
                productName,
                productDetail,
                category,
                productPrice,
                quantity,
              );
            }}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  buttonPickImg: {
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    color: Colors.white,
    justifyContent: 'center',
    paddingHorizontal: 10,
    height: 50,
    marginLeft: 20,
  },
  avatarContainer: {
    backgroundColor: 'gray',
    height: 150,
    width: 150,
    borderRadius: 10,
    borderWidth: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
  },
  button: {
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    height: 54,
    justifyContent: 'center',
    width: width * 0.9,
  },
});

export default AddProduct;
