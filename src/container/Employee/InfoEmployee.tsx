import React, { useState, useEffect } from 'react';
import { View, Dimensions, StyleSheet, Alert } from 'react-native';
import Colors from '../../constants/Colors';
import MyTextInput from '../../components/MyTextInput';
import MyButton from '../../components/MyButton';

let width = Dimensions.get('window').width;

const InfoEmployee: React.FC = ({ navigation, route }) => {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [userId, setUserId] = useState('');

  const { data } = route.params;

  useEffect(() => {
    setUsername(data.name);
    setPhone(data.phone);
    setUserId(data._id);
  }, [data]);

  const RemoveEmployee = idUser => {
    fetch(`http://192.168.1.10:5001/api/contacts/${idUser}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(responseData => {
        console.log('responseRemoveContact', responseData);
        navigation.goBack();
      })
      .catch(error => {
        console.error('errorrr: ', error);
      });
  };

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
        <MyTextInput
          placeholder={'Nhập họ tên'}
          value={username}
          onChangeText={value => {
            setUsername(value);
          }}
        />
        <MyTextInput
          placeholder={'Nhập số điện thoại'}
          value={phone}
          keyboardType="number-pad"
          onChangeText={value => {
            setPhone(value);
          }}
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
                  onPress: () => {
                    RemoveEmployee(userId);
                  },
                },
                {
                  text: 'Không',
                  onPress: () => { },
                },
              ],
              { cancelable: false },
            );
          }}
        />
        <MyButton
          style={styles.buttonEdit}
          text="Chỉnh sửa"
          onPress={() => { }}
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
