import React from 'react';
import Colors from '../constants/Colors';
import {Text, View} from 'react-native';

type MyHeaderProps = {
  nameTitle: string;
  onPress: () => void;
};

const MyHeader = ({nameTitle, onPress}: MyHeaderProps) => {
  return (
    <View
      style={{
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}
    >
      <View style={{backgroundColor: Colors.white, flex: 1.5}}>
        {/* <Text>hrm</Text> */}
      </View>
      <Text
        style={{
          flex: 6.5,
          color: Colors.white,
          fontSize: 20,
          fontWeight: '500',
        }}
      >
        {nameTitle}
      </Text>
      <View style={{backgroundColor: Colors.white, flex: 2}} />
    </View>
  );
};
export default MyHeader;
