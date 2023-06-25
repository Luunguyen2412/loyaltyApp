import React from 'react';
import Colors from '../constants/colors';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

// type MyListModuleProps = {
//   nameTitle: string;
//   navigation: () => void;
// };

const MyListModule: React.FC = ({ listModule, navigation }) => {
  return (
    <View style={styles.module}>
      {listModule.map((ele, index) => {
        return (
          <TouchableOpacity
            key={index.toString()}
            style={styles.container}
            onPress={() => navigation.navigate(ele.navigate)}
          >
            <View style={styles.styleButton} />
            <Text style={styles.text}>{ele.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  module: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingBottom: 20,
  },
  container: {
    width: 160,
    height: 128,
    paddingLeft: 15,
    borderRadius: 10,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 10,
  },
  styleButton: {
    backgroundColor: 'gray',
    height: 40,
    width: 40,
    marginBottom: 15,
    borderRadius: 10,
  },
  text: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: '400',
  },
});

export default MyListModule;
