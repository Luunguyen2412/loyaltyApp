import React, {useEffect} from 'react';
import {View, Dimensions, Image, StyleSheet} from 'react-native';
import MyTextInput from '../../components/MyTextInput';
import Colors from '../../constants/Colors';
import MyButton from '../../components/MyButton';
import {useDispatch} from 'react-redux';
import {logOut} from '../Login/reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchAPI, urlHost} from '../../constants/ApiConstants';

let width = Dimensions.get('window').width;

const ProfileScreen: React.FC = () => {
  const dispatch = useDispatch();

  const onLogOut = async () => {
    await AsyncStorage.clear();
    dispatch(logOut());
  };

  useEffect(() => {
    getInfomation();
  }, []);

  const getInfomation = async () => {
    const token = await AsyncStorage.getItem('access_token');

    // await fetch({
    //   url: `${urlHost}/api/users/current`,
    //   method: 'GET',
    // });
    fetch(`${urlHost}/api/users/current`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseData => {
        console.log('responseUserInfomation', responseData);
      })
      .catch(error => {
        console.log('errorUserInfomation', error);
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
      <View style={{paddingVertical: 30}}>
        <Image
          style={{
            backgroundColor: 'gray',
            height: 100,
            width: 100,
            borderRadius: 50,
            borderWidth: 1,
          }}
        />
      </View>

      <View>
        <MyTextInput value="Nguyen Viet Luu" editable={false} />
        <MyTextInput value="Employee" editable={false} />
        <MyTextInput value="Male" editable={false} />
        <MyTextInput value="0852585888" editable={false} />
        <MyTextInput value="nguyenvietluu2412@gmail.com" editable={false} />
      </View>

      <View style={{marginTop: 50}}>
        <MyButton onPress={onLogOut} style={styles.button} text="Log out" />
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

export default ProfileScreen;
