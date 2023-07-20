import React, {useEffect} from 'react';
import {View, Dimensions, Image, StyleSheet, Text} from 'react-native';
import MyTextInput from '../../components/MyTextInput';
import Colors from '../../constants/Colors';
import MyButton from '../../components/MyButton';
import {useDispatch} from 'react-redux';
import {logOut} from '../Login/reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchAPI, urlHost} from '../../constants/ApiConstants';
import {useNavigation} from '@react-navigation/native';

let width = Dimensions.get('window').width;

const PaymentScreen: React.FC = () => {
  const navigation = useNavigation();
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
      <Text>Payment scrennnn</Text>
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

export default PaymentScreen;
