import React from 'react';
import { View, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { logOut } from '../Login/reducer';

const ScreenA: React.FC = ({ navigation }) => {
  const dispatch = useDispatch();

  const navigateToScreenB = () => {
    navigation.navigate('ScreenB');
  };

  const onLogOut = () => {
    dispatch(logOut());
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Go to Screen B" onPress={navigateToScreenB} />
      <Button title="Log Out" onPress={onLogOut} />
    </View>
  );
};

export default ScreenA;
