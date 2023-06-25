import React from 'react';
import Colors from '../constants/colors';
import { Text, View, TouchableOpacity } from 'react-native';

type MyButtonProps = {
  text: string;
  onPress: () => void;
  keyboardType: string;
  value: string;
  enable: boolean;
};

const MyButton: React.FC = ({
  text,
  onPress,
  style,
  enable = true,
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
            color: Colors.white,
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
