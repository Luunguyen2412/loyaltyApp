import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Colors from '../../constants/Colors';
import MyButton from '../../components/MyButton';
import MyTextInput from '../../components/MyTextInput';

import {fetchAPI, urlHost} from '../../constants/ApiConstants';
import {useDispatch} from 'react-redux';
import {goToMain} from '../Login/reducer';
import MyDropdown from '../../components/MyDropdown';

let width = Dimensions.get('window').width;

// SignUp just for Customer
const SignupScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isValidate, setIsValidate] = useState(false);
  const [msgError, setMsgError] = useState('');
  const [position, setPosition] = useState(3); // 1 - Admin, 2 - Staff, 3 - Customer

  const [namePosition, setNamePosition] = useState('Khách hàng');

  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState(); // 1 - Male, 2 - Female;

  const [isOpenDropDown, setIsOpenDropDown] = useState(false);

  const dispatch = useDispatch();

  const onSignIn = async (userName, phoneNumber, pass, posiTion, addRess) => {
    if (phoneNumber === '' || pass === '' || userName === '') {
      setIsValidate(true);
      return;
    }

    const body = {
      username: userName,
      phone: phoneNumber,
      password: pass,
      position: posiTion,
      address: addRess,
    };

    console.log('bodyyyy', body);

    await fetchAPI({
      url: `${urlHost}/api/users/register`,
      data: body,
      method: 'POST',
    })
      .then(async responseData => {
        console.log('responseRegister', responseData);
        dispatch(goToMain());
      })
      .catch(error => {
        console.log('errorRegister', error);
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
            width: '100%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingTop: 40,
            backgroundColor: Colors.white,
          }}
        >
          {/* <MyTextInput placeholder="Nhập Avatar của bạn" /> */}

          <MyTextInput
            placeholder="Chọn vị trí của bạn"
            value={`Bạn là ${namePosition}`}
            editable={false}
          />

          <MyTextInput
            placeholder="Nhập họ tên của bạn"
            value={username}
            onChangeText={value => {
              setUsername(value);
              setIsValidate(false);
            }}
          />
          <MyTextInput
            placeholder="Nhập số điện thoại của bạn"
            value={phone}
            onChangeText={value => {
              setPhone(value);
              setIsValidate(false);
            }}
          />

          <MyTextInput
            placeholder="Nhập mật khẩu của bạn"
            value={password}
            onChangeText={value => {
              setPassword(value);
              setIsValidate(false);
            }}
          />

          <MyDropdown
            isOpen={isOpenDropDown}
            onPress={() => {
              setIsOpenDropDown(!isOpenDropDown);
            }}
            placeholder="Chọn giới tính của bạn"
            itemDrops={[
              {label: 'Nam', value: 1},
              {label: 'Nữ', value: 2},
            ]}
            showTickIcon
            onSelectItemValues={values => {
              setIsOpenDropDown(!isOpenDropDown);
              setGender(values);
            }}
            value={gender}
          />
          <MyTextInput
            placeholder="Nhập địa chỉ của bạn"
            value={address}
            onChangeText={value => {
              setAddress(value);
              setIsValidate(false);
            }}
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
          <MyButton
            onPress={() => {
              onSignIn(username, phone, password, position, address);
            }}
            style={styles.SignInButton}
            text="Tạo tài khoản"
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  SignInButton: {
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

  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  imgLogoStyle: {
    alignSelf: 'center',
    height: 200,
    marginTop: 60,
    width: width,
  },
});

export default SignupScreen;
