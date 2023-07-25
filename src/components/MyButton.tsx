import React from 'react';
import Colors from '../constants/Colors';
import {Text, View, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';

type MyButtonProps = {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  textColor?: string;
  style?: StyleProp<ViewStyle>;
};

const MyButton = ({
  text,
  onPress,
  style,
  disabled = false,
  textColor = Colors.white,
}: MyButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        {
          // backgroundColor: enable ? style.backgroundColor : Colors.grey,
          backgroundColor: Colors.PRIMARY,
        },
        disabled && {
          backgroundColor: Colors.grey,
        },
        style,
      ]}
      onPress={onPress}
    >
      <Text
        style={{
          color: textColor,
          fontSize: 20,
          fontWeight: '500',
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
export default MyButton;
