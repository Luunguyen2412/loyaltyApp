import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Colors from '../../constants/Colors';
import MyButton from '../../components/MyButton';
import MyTextInput from '../../components/MyTextInput';

let width = Dimensions.get('window').width;

const SignupScreen: React.FC = () => {
  const { username, setUsername } = useState('');
  const { password, setPassword } = useState('');

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
            justifyContent: 'flex-start',
            paddingTop: 40,
            backgroundColor: Colors.white,
          }}
        >
          <MyTextInput placeholder="Nhập tên của bạn" />
          <MyTextInput placeholder="Nhập họ của bạn" />
          <MyTextInput placeholder="Nhập số điện thoại của bạn" />
          <MyTextInput placeholder="Chọn ngày sinh của bạn" />
          <MyTextInput placeholder="Chọn giới tính của bạn" />

          <View style={{ height: 50 }} />

          <MyButton style={styles.SignInButton} text="Tạo tài khoản" />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  SignInButton: {
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

export default SignupScreen;
