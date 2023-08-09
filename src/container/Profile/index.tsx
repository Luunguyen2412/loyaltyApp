import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  Image,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native';
import MyTextInput from '../../components/MyTextInput';
import Colors from '../../constants/Colors';
import MyButton from '../../components/MyButton';
import {useDispatch, useSelector} from 'react-redux';
import {logOut} from '../Login/reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchAPI, urlHost} from '../../constants/ApiConstants';
import {RootState} from '../../store';
import {getProfile, getProfileFail, isFetching} from './reducer';
import {USER_ID} from '../../common/storage';

let width = Dimensions.get('window').width;

const ProfileScreen: React.FC = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState();

  const [position, setPosition] = useState(''); // 1 - Admin, 2 - Staff

  const [gender, setGender] = useState(''); // 1 - Male, 2 - Female;

  const {isLoading} = useSelector((state: RootState) => state.profile);
  const {dataUser} = useSelector((state: RootState) => state.auth);

  const onLogOut = async () => {
    await AsyncStorage.clear();
    dispatch(logOut());
  };

  useEffect(() => {
    getInfomation();
  }, []);

  const getInfomation = async () => {
    const user_id = await AsyncStorage.getItem(USER_ID);
    console.log('user_id', user_id);

    if (!user_id) {
      return;
    }
    dispatch(isFetching());

    await fetchAPI({
      url: `${urlHost}/api/users/${user_id}`,
      method: 'GET',
    })
      .then(async responseData => {
        console.log('responseProfileInfomation', responseData);
        dispatch(getProfile(responseData.data));
        setData(responseData.data);

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
      })
      .catch(error => {
        console.log('errorProfileInfomation', error);
        dispatch(getProfileFail());
      });
  };

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        backgroundColor: Colors.white,
      }}
    >
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
        <>
          {data ? (
            <>
              <View style={{paddingVertical: 30}}>
                <Image
                  style={{
                    backgroundColor: 'gray',
                    height: 100,
                    width: 100,
                    borderRadius: 50,
                    borderWidth: 1,
                  }}
                  source={{uri: data.avatar}}
                />
              </View>

              <View>
                <MyTextInput value={data.username} editable={false} />
                <MyTextInput value={data.phone} editable={false} />
                <MyTextInput value={position} editable={false} />
                <MyTextInput value={gender} editable={false} />
                <MyTextInput value={data.address} editable={false} />
              </View>
            </>
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: Colors.black,
                  marginTop: 5,
                }}
              >
                Không lấy được dữ liệu
              </Text>
            </View>
          )}
          <View style={{marginTop: 50}}>
            <MyButton onPress={onLogOut} style={styles.button} text="Log out" />
          </View>
        </>
      )}
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

export default ProfileScreen;
