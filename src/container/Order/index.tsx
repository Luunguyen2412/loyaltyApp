import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Colors from '../../constants/Colors';
import {urlHost} from '../../constants/ApiConstants';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';

const data = [
  {
    id: 1,
    productName: 'Smoothie Chilli',
  },
  {
    id: 2,
    productName: 'Smoothie Chilli',
  },
  {
    id: 1,
    productName: 'Smoothie Chilli',
  },
  {
    id: 1,
    productName: 'Smoothie Chilli',
  },
  {
    id: 1,
    productName: 'Smoothie Chilli',
  },
  {
    id: 1,
    productName: 'Smoothie Chilli',
  },
  {
    id: 1,
    productName: 'Smoothie Chilli',
  },
];

const OrderScreen: React.FC = ({}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
      }}
    >
      <Text>order screennnn</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonAdd: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    position: 'absolute',
    bottom: 50,
    right: 30,
    height: 60,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 100,
  },
});

export default OrderScreen;
