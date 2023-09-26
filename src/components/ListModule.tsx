import React, {useEffect, useState} from 'react';
import Colors from '../constants/Colors';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {RootState} from '../store';
import {useSelector} from 'react-redux';

type MyListModuleProps = {
  listModule: [];
};

const MyListModule = ({listModule}: MyListModuleProps) => {
  const navigation = useNavigation();

  const [data, setData] = useState([]);

  const {dataUser} = useSelector((state: RootState) => state.profile);

  const [permissionUser, setPermissionUser] = useState(dataUser.position);

  // console.log('dataUser', dataUser);

  // console.log('permissisonnn', permissionUser);

  useEffect(() => {
    const listForEmployee = listModule.filter(item => item.permission === 2);
    if (permissionUser === 1) {
      // 1 - admin
      setData(listModule);
    } else {
      // 2 - staff
      setData(listForEmployee);
    }
  }, [dataUser]);

  return (
    <View style={styles.module}>
      {data.map((ele, index) => {
        return (
          <TouchableOpacity
            key={index.toString()}
            style={styles.container}
            onPress={() => {
              navigation.navigate(ele.navigate);
            }}
          >
            <View style={styles.styleButton}>
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
