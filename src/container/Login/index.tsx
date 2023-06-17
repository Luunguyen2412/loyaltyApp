import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Colors from '../../constants/colors';
import MyButton from '../../components/MyButton';
import MyTextInput from '../../components/MyTextInput';
import { useSelector, useDispatch } from 'react-redux';
import { goToMain } from './reducer';

let width = Dimensions.get('window').width;

const LoginScreen: React.FC = ({ navigation }) => {
  const { username, setUsername } = useState('');
  const { password, setPassword } = useState('');

  const dispatch = useDispatch();

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="always"
      keyboardDismissMode="on-drag"
      bounces={false}
      overScrollMode="always"
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      enableOnAndroid
      enableAutomaticScroll
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <View style={styles.container}>
        <View
          style={{
            width: '100%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ padding: 20, fontSize: 20, fontWeight: 'bold' }}>
            Login Screen
          </Text>
          <MyTextInput placeholder={'Nhập số điện thoại'} value={username} />
          <MyTextInput placeholder="Nhập password" value={password} />

          <View style={{ height: 50 }} />

          <MyButton
            style={styles.LoginButton}
            text="Đăng nhập"
            onPress={() => dispatch(goToMain())}
          />

          <MyButton
            style={styles.SignInButton}
            text="Tạo tài khoản"
            onPress={() => {
              navigation.navigate('SignUp');
            }}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  LoginButton: {
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    borderWidth: 1,
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    height: 50,
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
    height: 50,
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
