import React from 'react';
import Colors from '../constants/Colors';
import {StyleSheet, TextInput, Dimensions, TextInputProps} from 'react-native';

let width = Dimensions.get('window').width;

const MyTextInput = (props: TextInputProps) => {
  return (
    <TextInput
      placeholderTextColor={Colors.grey}
      selectionColor={Colors.PRIMARY50}
      style={styles.textInput}
      // editable={editable}
      {...props}
    />
  );
};
const styles = StyleSheet.create({
  textInput: {
    paddingHorizontal: 10,
    alignItems: 'center',
    borderWidth: 1,
    flexDirection: 'row',
    height: 50,
    width: width * 0.9,
    borderRadius: 10,
    borderColor: Colors.grey,
    marginBottom: 15,
    color: Colors.black,
  },
});

export default MyTextInput;
