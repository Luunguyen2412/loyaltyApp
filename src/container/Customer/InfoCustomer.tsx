import React, {useState, useEffect} from 'react';
import {View, Dimensions, StyleSheet, Alert} from 'react-native';
import Colors from '../../constants/Colors';
import MyTextInput from '../../components/MyTextInput';
import MyButton from '../../components/MyButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import {fetchAPI, urlHost} from '../../constants/ApiConstants';

let width = Dimensions.get('window').width;

const InfoCustomer: React.FC = ({}) => {
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

  const RemoveEmployee = idUser => {
    fetch(`${urlHost}/api/contacts/${idUser}`, {
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
        <MyTextInput placeholder={'Họ tên'} value={username} editable={false} />
        <MyTextInput
          placeholder={'Số điện thoại'}
          value={phone}
          editable={false}
        />
        <MyTextInput
          placeholder={'Số điểm'}
          value={point > 0 ? `${point.toString()} điểm` : '0 điểm'}
          editable={false}
        />
        <MyTextInput
          placeholder={'Xếp hạng'}
          // value={membership > 0 ? membership.toString() : 'Thường'}
          value={getMembershipLevel()}
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
                  onPress: () => {
                    RemoveEmployee(userId);
                  },
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
          onPress={() => {}}
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

export default InfoCustomer;
