import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import Colors from '../../constants/Colors';
import MyTextInput from '../../components/MyTextInput';
import MyButton from '../../components/MyButton';

let width = Dimensions.get('window').width;

const AddEmployee: React.FC = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const AddEmployee = (username, phone) => {
    const body = { name: username, phone: phone };
    console.log('1111', body);

    fetch('http://192.168.1.10:5001/api/contacts', {
      method: 'POST',
      body: JSON.stringify({
        name: username,
        phone: phone,
      }),
    })
      .then(response => response.json())
      .then(responseData => {
        console.log('response', responseData);
        navigation.goBack();
      })
      .catch(error => {
        console.error(error);
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

        {/* <MyTextInput placeholder={'Nhập địa chỉ'} value={address} /> */}
        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <MyButton
            style={styles.button}
            text="Lưu"
            onPress={() => AddEmployee(username, phone)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
