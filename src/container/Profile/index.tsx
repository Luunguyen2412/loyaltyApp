import React, {useEffect, useState} from 'react';
import {View, Dimensions, Image, StyleSheet} from 'react-native';
import MyTextInput from '../../components/MyTextInput';
import Colors from '../../constants/Colors';
import MyButton from '../../components/MyButton';
import {useDispatch, useSelector} from 'react-redux';
import {logOut} from '../Login/reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchAPI, urlHost} from '../../constants/ApiConstants';
import {RootState} from '../../store';

let width = Dimensions.get('window').width;

const ProfileScreen: React.FC = () => {
  const dispatch = useDispatch();

  const [position, setPosition] = useState(''); // 1 - Admin, 2 - Staff

  const [gender, setGender] = useState(''); // 1 - Male, 2 - Female;

  const {dataUser} = useSelector((state: RootState) => state.auth);

  const onLogOut = async () => {
    await AsyncStorage.clear();
    dispatch(logOut());
  };

  useEffect(() => {
    if (dataUser.gender === 1) {
      setGender('Nam');
    } else {
      setGender('Nữ');
    }

    if (dataUser.position === 1) {
      setPosition('Admin');
    } else {
      setPosition('Staff');
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        backgroundColor: Colors.white,
      }}
    >
      <View style={{paddingVertical: 30}}>
        <Image
          style={{
            backgroundColor: 'gray',
            height: 100,
            width: 100,
            borderRadius: 50,
            borderWidth: 1,
          }}
          source={{uri: dataUser.avatar}}
        />
      </View>

      <View>
        <MyTextInput value={dataUser.username} editable={false} />
        <MyTextInput value={dataUser.phone} editable={false} />
        <MyTextInput value={position} editable={false} />
        <MyTextInput value={gender} editable={false} />
        <MyTextInput value={dataUser.address} editable={false} />
      </View>

      <View style={{marginTop: 50}}>
        <MyButton onPress={onLogOut} style={styles.button} text="Log out" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
  },
  button: {
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    height: 54,
    justifyContent: 'center',
    width: width * 0.9,
  },
});

export default ProfileScreen;
