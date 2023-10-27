import React from 'react';
import Colors from '../constants/Colors';
import {Text, View, Modal} from 'react-native';

type MyLoaderProps = {
  loading?: boolean;
};

const MyLoader = ({loading}: MyLoaderProps) => {
  return (
    <Modal
      style={{justifyContent: 'center', alignItems: 'center'}}
      transparent={true}
      animationType="fade"
      visible={loading}
      presentationStyle="fullScreen"
    >
      <View
        style={{
          height: 50,
          width: 50,
          position: 'absolute',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: '500',
          }}
        >
          Loading
        </Text>
      </View>
    </Modal>
  );
};
export default MyLoader;
