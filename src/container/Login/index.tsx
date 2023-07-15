import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../constants/Colors';
import MyButton from '../../components/MyButton';
import MyTextInput from '../../components/MyTextInput';
import {useSelector, useDispatch} from 'react-redux';
import {goToMain, isFetching, isLogInFail} from './reducer';
import {useNavigation} from '@react-navigation/native';
import {fetchAPI, urlHost} from '../../constants/ApiConstants';
import {RootState} from '../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KEY_ACCESS_TOKEN} from '../../common/storage';

let width = Dimensions.get('window').width;

const LoginScreen: React.FC = ({}) => {
  const navigation = useNavigation();

  const [username, setUsername] = useState(''); //phone number
  const [password, setPassword] = useState('');
  const [isValidate, setIsValidate] = useState(false);
  const [msgError, setMsgError] = useState('');

  const {isLoading} = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    authenticate();
  }, []);

  const authenticate = async () => {
    const access_token = await AsyncStorage.getItem(KEY_ACCESS_TOKEN);
    console.log('===>access_token', access_token);
    if (access_token) {
      dispatch(goToMain());
    } else {
      navigation.navigate('Login');
    }
  };

  const onLogIn = async (phone, pass) => {
    if (phone === '' || pass === '') {
      setIsValidate(true);
    }

    dispatch(isFetching());
    const body = {
      phone: phone,
      password: pass,
    };

    await fetchAPI({
      url: `${urlHost}/api/users/login`,
      data: body,
      method: 'POST',
    })
      .then(async responseData => {
        console.log('responseLogin', responseData);
        if (responseData.isError) {
          dispatch(isLogInFail());
          setIsValidate(true);
          setMsgError(responseData.message);
        } else {
          await AsyncStorage.setItem(
            KEY_ACCESS_TOKEN,
            responseData.accessToken,
          );

          dispatch(goToMain());
        }
      })
      .catch(error => {
        console.log('errorLogin', error);
        dispatch(isLogInFail());
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {isLoading && (
          <View
            style={{
              position: 'absolute',
              bottom: 350,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ActivityIndicator size="large" color={Colors.PRIMARY} />
          </View>
        )}
        <Text
          style={{
            padding: 20,
            fontSize: 20,
            fontWeight: 'bold',
          }}
        >
          Login Screen
        </Text>
        <MyTextInput
          placeholder={'Nhập số điện thoại'}
          value={username}
          onChangeText={value => {
            setUsername(value);
            setIsValidate(false);
          }}
        />
        <MyTextInput
          placeholder="Nhập password"
          value={password}
          onChangeText={value => {
            setPassword(value);
            setIsValidate(false);
          }}
        />

        {isValidate ? (
          <View style={{height: 50, alignItems: 'center'}}>
            <Text style={{color: 'red'}}>
              {msgError ? msgError : 'Phone or Password does not valid!'}
            </Text>
          </View>
        ) : (
          <View style={{height: 50}} />
        )}

        <MyButton
          style={styles.LoginButton}
          text="Đăng nhập"
          onPress={() => {
            onLogIn(username, password);
          }}
        />

        <MyButton
          style={styles.SignInButton}
          text="Tạo tài khoản"
          textColor={Colors.PRIMARY}
          onPress={() => {
            navigation.navigate('SignUp');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  LoginButton: {
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
  SignInButton: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderColor: Colors.PRIMARY,
    borderRadius: 10,
    borderWidth: 1,
    color: Colors.PRIMARY,
    fontSize: 16,
    fontWeight: 'bold',
    height: 54,
    justifyContent: 'center',
    marginTop: 20,
    width: width * 0.9,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  imgLogoStyle: {
    alignSelf: 'center',
    height: 200,
    marginTop: 60,
    width: width,
  },
});

export default LoginScreen;
