import React, {useState, useEffect} from 'react';
import {View, Dimensions, StyleSheet, Alert} from 'react-native';
import Colors from '../../constants/Colors';
import MyTextInput from '../../components/MyTextInput';
import MyButton from '../../components/MyButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import {fetchAPI, urlHost} from '../../constants/ApiConstants';

let width = Dimensions.get('window').width;

const UpdateCustomer: React.FC = ({}) => {
  const navigation = useNavigation();
  const route = useRoute();

  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [point, setPoint] = useState();
  const [membership, setMembership] = useState();

  const [userId, setUserId] = useState('');

  const {data} = route.params;

  useEffect(() => {
    setUsername(data.name);
    setPhone(data.phone);
    setPoint(data.point);
    setMembership(data.membership);
    setUserId(data._id);
  }, [data]);

  const _updateCustomer = async (userName, Phone, Point, Membership) => {
    const body = {
      name: userName,
      phone: Phone,
      point: Point,
      membership: Membership,
    };
    await fetchAPI({
      url: `${urlHost}/api/contacts/${userId}`,
      data: body,
      method: 'PUT',
    })
      .then(async responseData => {
        console.log('responseUpdateCustomer', responseData);
        navigation.goBack();
      })
      .catch(error => {
        console.log('errorUpdateCustomer', error);
      });
    navigation.goBack();
  };

  const getMembershipLevel = () => {
    if (point >= 2000) {
      return 'Vàng';
    } else if (point >= 1000) {
      return 'Bạc';
    } else if (point >= 500) {
      return 'Đồng';
    } else {
      return 'Thường';
    }
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
        <MyTextInput placeholder={'Họ tên'} value={username} />
        <MyTextInput placeholder={'Số điện thoại'} value={phone} />
        <MyTextInput
          placeholder={'Số điểm'}
          value={point > 0 ? `${point.toString()} điểm` : '0 điểm'}
        />
        <MyTextInput placeholder={'Xếp hạng'} value={getMembershipLevel()} />
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
          onPress={() => _updateCustomer(username, phone, point, membership)}
        />
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

export default UpdateCustomer;
