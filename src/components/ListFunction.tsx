import React from 'react';
import Colors from '../constants/Colors';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// type MyListModuleProps = {
//   nameTitle: string;
//   navigation: () => void;
// };

const MyListFunction: React.FC = ({listFunction, navigation}) => {
  return (
    <View style={styles.container}>
      {listFunction.map((ele, index) => {
        return (
          <TouchableOpacity
            key={index.toString()}
            style={styles.button}
            onPress={() => navigation.navigate(ele.navigate)}
          >
            <View style={styles.viewButton}>
              <FontAwesome5
                name={ele.icon}
                size={30}
                color={Colors.PRIMARY04}
              />
            </View>
            <Text style={styles.text}>{ele.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingTop: 20,
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    height: 56,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: Colors.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  viewButton: {
    justifyContent: 'center',
    height: 40,
    width: 40,
    marginRight: 15,
    borderRadius: 10,
  },
  text: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: '400',
  },
});

export default MyListFunction;
