import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';
import MyTextInput from '../../components/MyTextInput';
import MyButton from '../../components/MyButton';

let width = Dimensions.get('window').width;

const AddEmployee: React.FC = ({ navigation }) => {
  const { username, setUsername } = useState('');
  const { phone, setPhone } = useState('');
  const { address, setAddress } = useState('');

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
        <MyTextInput placeholder={'Nhập họ tên'} value={username} />
        <MyTextInput
          placeholder={'Nhập số điện thoại'}
          value={username}
          keyboardType="number-pad"
        />
        <MyTextInput placeholder={'Nhập địa chỉ'} value={username} />
        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <MyButton
            style={styles.button}
            text="Lưu"
            onPress={() => navigation.goBack()}
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
