import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Colors from '../../constants/colors';

const ListEmployee: React.FC = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: Colors.black }}>List Employee</Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddEmployee');
        }}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: 60,
          position: 'absolute',
          bottom: 50,
          right: 30,
          height: 60,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 100,
        }}
      />
    </View>
  );
};

export default ListEmployee;
