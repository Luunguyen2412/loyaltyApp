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
import {useNavigation, useRoute} from '@react-navigation/native';
import MyDropdown from '../../components/MyDropdown';
import {useDispatch} from 'react-redux';
import {isFetching, updateUserSuccess} from './reducer';
import ImagePicker from 'react-native-image-crop-picker';

let width = Dimensions.get('window').width;

const UpdateEmployee: React.FC = ({}) => {
  const navigation = useNavigation();
  const route = useRoute();

  const [avatar, setAvatar] = useState('');
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

  const dispatch = useDispatch();

  useEffect(() => {
    setAvatar(data.avatar);
    setUsername(data.username);
    setPassword(data.password);
    setPhone(data.phone);
    setPosition(data.position);
    setGender(data.gender);
    setAddress(data.address);
    setUserId(data._id);
  }, []);

  const _updateEmployee = async (
    avaTar,
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
      avatar: avaTar,
      username: userName,
      phone: phoneNumber,
      password: pass,
      position: posiTion,
      address: addRess,
      gender: genDer,
    };

    dispatch(isFetching());

    // console.log('bodyyy', body);

    await fetchAPI({
      url: `${urlHost}/api/users/${userId}`,
      data: body,
      method: 'PUT',
    })
      .then(responseData => {
        console.log('responseUpdateEmployee', responseData);
        dispatch(updateUserSuccess());
        navigation.goBack();
      })
      .catch(error => {
        console.log('errorUpdateEmployee', error);
      });
  };

  const handlePickImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log('imageeee', image);
      setAvatar(image.path);
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
        <View
          style={{
            paddingVertical: 15,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Image
            style={styles.avatarContainer}
            source={{uri: avatar}}
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
        <MyDropdown
          isOpen={isOpenDropDownPosition}
          onPress={() => {
            setIsOpenDropDownPosition(!isOpenDropDownPosition);
          }}
          placeholder="Chọn vị trí của bạn"
          itemDrops={[
            {label: 'Admin', value: 1},
            {label: 'Staff', value: 2},
          ]}
          showTickIcon
          onSelectItemValues={values => {
            setIsOpenDropDownPosition(!isOpenDropDownPosition);
            setPosition(values);
          }}
          value={position}
        />

        <MyTextInput
          style={styles.textInput}
          placeholder="Nhập họ tên của bạn"
          value={username}
          onChangeText={value => {
            setUsername(value);
            setIsValidate(false);
          }}
        />
        <MyTextInput
          style={styles.textInput}
          placeholder="Nhập số điện thoại của bạn"
          value={phone}
          keyboardType="number-pad"
          onChangeText={value => {
            setPhone(value);
            setIsValidate(false);
          }}
        />

        {/* <MyTextInput
          placeholder="Nhập mật khẩu của bạn"
          value={password}
          onChangeText={value => {
            setPassword(value);
            setIsValidate(false);
          }}
        /> */}

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
          style={styles.textInput}
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
            _updateEmployee(
              avatar,
              username,
              phone,
              password,
              position,
              address,
              gender,
            )
          }
        />
      </View>
    </View>
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
  textInput: {
    paddingHorizontal: 10,
    alignItems: 'center',
    borderWidth: 1,
    flexDirection: 'row',
    height: 50,
    width: width * 0.9,
    borderRadius: 10,
    borderColor: Colors.black,
    marginBottom: 15,
    color: Colors.black,
  },
  avatarContainer: {
    backgroundColor: 'gray',
    height: 100,
    width: 100,
    borderRadius: 50,
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

export default UpdateEmployee;
