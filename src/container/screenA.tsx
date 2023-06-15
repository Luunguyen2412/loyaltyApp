import React from 'react';
import { View, Button } from 'react-native';

const ScreenA: React.FC = ({ navigation }) => {
  const navigateToScreenB = () => {
    navigation.navigate('ScreenB');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Go to Screen B" onPress={navigateToScreenB} />
    </View>
  );
};

export default ScreenA;
