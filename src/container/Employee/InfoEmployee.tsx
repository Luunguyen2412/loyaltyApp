import React, {useState, useEffect} from 'react';
import {View, Dimensions, StyleSheet, Alert, Image} from 'react-native';
import Colors from '../../constants/Colors';
import MyTextInput from '../../components/MyTextInput';
import MyButton from '../../components/MyButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import {fetchAPI, urlHost} from '../../constants/ApiConstants';

let width = Dimensions.get('window').width;

const InfoEmployee: React.FC = ({}) => {
  const navigation = useNavigation();
  const route = useRoute();

  const [avatar, setAvatar] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');

  const [position, setPosition] = useState(''); // 1 - Admin, 2 - Staff, 3 - Customer

  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');

  const [userId, setUserId] = useState('');

  const {data} = route.params;

  useEffect(() => {
    setAvatar(data.avatar);
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

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: Colors.white,
      }}
    >
      <View
        style={{
          flex: 8,
          paddingTop: 20,
        }}
      >
        <View style={{paddingVertical: 30}}>
          <Image
            style={{
              backgroundColor: 'gray',
              height: 100,
              width: 100,
              borderRadius: 50,
              borderWidth: 1,
            }}
            source={{uri: avatar}}
          />
        </View>
        <MyTextInput placeholder={'Họ tên'} value={username} editable={false} />
        <MyTextInput
          placeholder={'Số điện thoại'}
          value={phone}
          editable={false}
        />
        <MyTextInput
          placeholder="Vị trí của bạn"
          value={position}
          editable={false}
        />
        <MyTextInput
          placeholder="Chọn giới tính của bạn"
          value={gender}
          editable={false}
        />
        <MyTextInput
          placeholder="Địa chỉ của bạn"
          value={address}
          editable={false}
        />
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          flex: 2,
        }}
      >
        <MyButton
          style={styles.buttonRemove}
          text="Xoá"
          onPress={() => {
            Alert.alert(
              'Thông báo',
              'Bạn có chắc chắn muốn xoá nhân viên này không?',
              [
                {
                  text: 'Đồng ý',
                  onPress: () => {},
                },
                {
                  text: 'Không',
                  onPress: () => {},
                },
              ],
              {cancelable: false},
            );
          }}
        />
        <MyButton
          style={styles.buttonEdit}
          text="Chỉnh sửa"
          onPress={() => {
            navigation.navigate('UpdateEmployee', {data: data});
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonEdit: {
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY04,
    borderRadius: 10,
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    height: 54,
    justifyContent: 'center',
    width: 156,
  },
  buttonRemove: {
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    height: 54,
    justifyContent: 'center',
    width: 156,
  },
});

export default InfoEmployee;
