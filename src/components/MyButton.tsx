import React from 'react';
import Colors from '../constants/Colors';
import {Text, View, TouchableOpacity} from 'react-native';

type MyButtonProps = {
  text: string;
  onPress: () => void;
  keyboardType: string;
  value: string;
  enable: boolean;
  textColor: string;
};

const MyButton: React.FC = ({
  text,
  onPress,
  style,
  enable = true,
  textColor = Colors.white,
}: MyButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          style,
          {
            backgroundColor: enable ? style.backgroundColor : Colors.grey,
          },
        ]}
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
      </View>
    </TouchableOpacity>
  );
};
export default MyButton;
