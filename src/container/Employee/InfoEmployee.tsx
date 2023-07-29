import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator,
  Text,
} from 'react-native';
import Colors from '../../constants/Colors';
import MyTextInput from '../../components/MyTextInput';
import MyButton from '../../components/MyButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import {fetchAPI, urlHost} from '../../constants/ApiConstants';
import {getUserSuccess, isFetching} from './reducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {useFocusEffect} from '@react-navigation/native';

let width = Dimensions.get('window').width;

const InfoEmployee: React.FC = ({}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  // const [avatar, setAvatar] = useState('');
  // const [username, setUsername] = useState('');
  // const [phone, setPhone] = useState('');
  // const [address, setAddress] = useState('');

  const [position, setPosition] = useState(''); // 1 - Admin, 2 - Staff, 3 - Customer

  const [gender, setGender] = useState('');

  const {isLoading} = useSelector((state: RootState) => state.employee);

  const [dataUser, setDataUser] = useState();

  const [shouldReloadData, setShouldReloadData] = useState(false);

  useEffect(() => {
    const userId = route.params.data._id;

    if (userId) {
      getInfomation(userId);
    }
  }, []);

  const getInfomation = async idUser => {
    dispatch(isFetching());

    await fetchAPI({
      url: `${urlHost}/api/users/${idUser}`,
      method: 'GET',
    })
      .then(async responseData => {
        console.log('responseUserInfomation', responseData);
        dispatch(getUserSuccess());
        setDataUser(responseData.data);

        if (responseData.data.gender === 1) {
          setGender('Nam');
        } else {
          setGender('Nữ');
        }
        if (responseData.data.position === 1) {
          setPosition('Admin');
        } else {
          setPosition('Staff');
        }

        setShouldReloadData(false);
      })
      .catch(error => {
        console.log('errorUserInfomation', error);
      });
  };

  return (
    <>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size="large" color={Colors.PRIMARY} />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            backgroundColor: Colors.white,
          }}
        >
          {dataUser ? (
            <>
              <View
                style={{
                  flex: 8,
                  paddingTop: 20,
                }}
              >
                <View style={{paddingVertical: 15}}>
                  <Image
                    style={{
                      backgroundColor: 'gray',
                      height: 100,
                      width: 100,
                      borderRadius: 50,
                      borderWidth: 1,
                    }}
                    source={{uri: dataUser.avatar}}
                    resizeMode="contain"
                  />
                </View>
                <MyTextInput
                  placeholder={'Họ tên'}
                  value={dataUser.username}
                  editable={false}
                />
                <MyTextInput
                  placeholder={'Số điện thoại'}
                  value={dataUser.phone}
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
                  value={dataUser.address}
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
                    navigation.navigate('UpdateEmployee', {data: dataUser});
                  }}
                />
              </View>
            </>
          ) : (
            <Text>Khong co du lieu</Text>
          )}
        </View>
      )}
    </>
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
