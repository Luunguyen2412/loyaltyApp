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
  const [phone, setPhone] = useState('');
  const [point, setPoint] = useState();

  const _AddEmployee = async (userName, Phone, Point) => {
    const body = {
      name: userName,
      phone: Phone,
      point: Point,
    };
    await fetchAPI({
      url: `${urlHost}/api/contacts`,
      data: body,
      method: 'POST',
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
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
        <MyTextInput
          placeholder={'Nhập số điểm'}
          value={point}
          keyboardType="number-pad"
          onChangeText={value => {
            setPoint(value);
          }}
        />
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
          onPress={() => _AddEmployee(username, phone, point)}
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
