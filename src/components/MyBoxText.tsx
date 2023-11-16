import React from 'react';
import Colors from '../constants/Colors';
import {Text, View, Dimensions} from 'react-native';

let width = Dimensions.get('window').width;

type MyBoxTextProps = {
  title?: string;
};

const MyBoxText = ({title}: MyBoxTextProps) => {
  return (
    <View
      style={{
        padding: 10,
        borderWidth: 1,
        width: width * 0.9,
        borderRadius: 10,
        borderColor: Colors.grey,
        height: 50,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: 10,
      }}
    >
      <Text
        style={{
          color: Colors.black,
          fontSize: 16,
        }}
      >
        {title}
      </Text>
    </View>
  );
};
export default MyBoxText;
