import React from 'react';
import Colors from '../constants/Colors';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

let width = Dimensions.get('window').width;

type MyDropdownProps = {
  label;
  value;
  itemDrops;
  onSelectItemValues;
  placeholder;
  showTickIcon;
  onPress;
  isOpen;
};

const MyDropdown: React.FC = ({
  label,
  value,
  itemDrops,
  onSelectItemValues,
  placeholder,
  showTickIcon,
  onPress,
  isOpen,
}: MyDropdownProps) => {
  return (
    <View style={styles.dropdownContainer}>
      <DropDownPicker
        open={isOpen}
        placeholder={placeholder}
        value={value}
        items={itemDrops}
        onSelectItem={item => {
          onSelectItemValues(item?.value);
        }}
        onPress={onPress}
        textStyle={{fontSize: 14}}
        showArrowIcon
        showTickIcon={showTickIcon}
        TickIconComponent={({style}) => {
          <FontAwesome5 name={'chevron-up'} size={16} color={Colors.black} />;
        }}
        tickIconStyle={{height: 20, width: 20}}
        mode="BADGE"
        theme="LIGHT"
        searchable={false}
        ArrowUpIconComponent={({style}) => (
          <FontAwesome5 name={'chevron-up'} size={16} color={Colors.black} />
        )}
        ArrowDownIconComponent={({style}) => (
          <FontAwesome5 name={'chevron-down'} size={16} color={Colors.black} />
        )}
        arrowIconStyle={{
          width: 30,
          height: 20,
          top: -10,
        }}
        dropDownContainerStyle={{
          borderWidth: 1,
          backgroundColor: Colors.grey,
          borderColor: Colors.grey,
          zIndex: 1,
        }}
        zIndex={1}
        style={styles.dropDownItemStyle}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  dropDownItemStyle: {
    backgroundColor: Colors.white,
  },
  dropdownContainer: {
    // backgroundColor: Colors.white,
    // borderWidth: 1,
    // height: 50,
    // width: width * 0.9,
    // borderRadius: 10,
    // borderColor: Colors.grey,
    // marginBottom: 15,
    // zIndex: 1,
    borderWidth: 1,
    height: 50,
    width: width * 0.9,
    borderRadius: 10,
    borderColor: Colors.grey,
    marginBottom: 15,
    zIndex: 1,
  },
});
export default MyDropdown;
