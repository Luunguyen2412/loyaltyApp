import React, {useState, useEffect} from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
import MyTextInput from '../../components/MyTextInput';
import MyButton from '../../components/MyButton';
import {fetchAPI, urlHost} from '../../constants/ApiConstants';
import {useNavigation} from '@react-navigation/native';

let width = Dimensions.get('window').width;

const AddEmployee: React.FC = ({}) => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isValidate, setIsValidate] = useState(false);
  const [msgError, setMsgError] = useState('');
  const [position, setPosition] = useState(); // 1 - Admin, 2 - Staff, 3 - Customer

  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState();

  const _AddEmployee = async (
    userName,
    phoneNumber,
    pass,
    posiTion,
    addRess,
  ) => {
    if (phoneNumber === '' || pass === '' || userName === '') {
      setIsValidate(true);
    }

    const body = {
      username: userName,
      phone: phoneNumber,
      password: pass,
      position: posiTion,
      address: addRess,
    };

    await fetchAPI({
      url: `${urlHost}/api/users/register`,
      data: body,
      method: 'POST',
    })
      .then(async responseData => {
        console.log('responseAddCustomer', responseData);
        navigation.goBack();
      })
      .catch(error => {
        console.log('errorAddCustomer', error);
      });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 8,
          paddingTop: 20,
        }}
      >
        {/* <MyTextInput placeholder="Nhập Avatar của bạn" /> */}
        <MyTextInput
          placeholder="Chọn vị trí của bạn"
          value={gender}
          onChangeText={value => {
            setPosition(value);
            setIsValidate(false);
          }}
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
          keyboardType="number-pad"
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

        <MyTextInput
          placeholder="Chọn giới tính của bạn"
          value={gender}
          onChangeText={value => {
            setGender(value);
            setIsValidate(false);
          }}
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
          onPress={() =>
            _AddEmployee(username, phone, password, position, address)
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default AddEmployee;
