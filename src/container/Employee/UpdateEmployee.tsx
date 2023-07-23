import React, {useState, useEffect} from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
import MyTextInput from '../../components/MyTextInput';
import MyButton from '../../components/MyButton';
import {fetchAPI, urlHost} from '../../constants/ApiConstants';
import {useNavigation} from '@react-navigation/native';
import MyDropdown from '../../components/MyDropdown';

let width = Dimensions.get('window').width;

const UpdateEmployee: React.FC = ({}) => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isValidate, setIsValidate] = useState(false);
  const [msgError, setMsgError] = useState('');
  const [position, setPosition] = useState(); // 1 - Admin, 2 - Staff

  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState(); // 1 - Male, 2 - Female;

  const [isOpenDropDownPosition, setIsOpenDropDownPosition] = useState(false);

  const [isOpenDropDownGender, setIsOpenDropDownGender] = useState(false);

  const [userId, setUserId] = useState('');

  const {data} = route.params;

  useEffect(() => {
    // setAvatar(data.avatar);
    setUsername(data.username);
    setPhone(data.phone);
    setPosition(data.position);
    setAddress(data.address);
    setUserId(data._id);

    if (data.gender === 1) {
      setGender('Nam');
    } else if (data.gender === 2) {
      setGender('Nữ');
    } else {
      setGender('');
    }

    if (data.position === 1) {
      setPosition('Admin');
    } else if (data.position === 2) {
      setPosition('Staff');
    } else if (data.position === 3) {
      setPosition('Customer');
    }
  }, [data]);

  const _updateEmployee = async (
    userName,
    phoneNumber,
    pass,
    posiTion,
    addRess,
    genDer,
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
      gender: genDer,
    };

    await fetchAPI({
      url: `${urlHost}/api/users/${userId}`,
      data: body,
      method: 'PUT',
    })
      .then(async responseData => {
        console.log('responseUpdateEmployee', responseData);
        navigation.goBack();
      })
      .catch(error => {
        console.log('errorUpdateEmployee', error);
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
        <MyDropdown
          isOpen={isOpenDropDownPosition}
          onPress={() => {
            setIsOpenDropDownPosition(!isOpenDropDownPosition);
          }}
          placeholder="Chọn vị trí của bạn"
          itemDrops={[
            {label: 'Admin', value: 1},
            {label: 'Nhân viên', value: 2},
          ]}
          showTickIcon
          onSelectItemValues={values => {
            setIsOpenDropDownPosition(!isOpenDropDownPosition);
            setPosition(values);
          }}
          value={position}
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

        <MyDropdown
          isOpen={isOpenDropDownGender}
          onPress={() => {
            setIsOpenDropDownGender(!isOpenDropDownGender);
          }}
          placeholder="Chọn giới tính của bạn"
          itemDrops={[
            {label: 'Nam', value: 1},
            {label: 'Nữ', value: 2},
          ]}
          showTickIcon
          onSelectItemValues={values => {
            setIsOpenDropDownGender(!isOpenDropDownGender);
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
            _updateEmployee(username, phone, password, position, address)
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

export default UpdateEmployee;
