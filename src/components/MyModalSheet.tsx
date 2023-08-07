import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  Text,
} from 'react-native';
import React, {Component} from 'react';
import Colors from '../constants/Colors';
import RBSheet from 'react-native-raw-bottom-sheet';

// Lấy kích thước màn hình
const screenHeight = Dimensions.get('window').height;

// Tính toán kích thước modal
const modalHeight = screenHeight * 0.5;

type MyModalSheetProps = {
  ref?: () => void;
  closeModal?: () => void;
  dataSearch: string;
  textHeader: string;
  data: Array;
  renderItem: () => void;
};

const MyModalSheet = ({
  ref,
  closeModal,
  dataSearch,
  textHeader,
  data,
  renderItem,
}: MyModalSheetProps) => {
  return (
    <RBSheet
      ref={ref}
      height={modalHeight}
      closeOnDragDown
      closeOnPressMask
      duration={250}
      customStyles={{
        container: {
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
        },
        wrapper: {
          backgroundColor: 'rgba(66, 76, 88, 0.6)',
        },
        draggableIcon: {
          backgroundColor: Colors.grey,
        },
      }}
    >
      {/* <View style={[styles.modalContent]}>
        <View style={styles.modalHeader}>
          <TouchableOpacity
            onPress={closeModal}
            hitSlop={{
              top: 20,
              right: 20,
              bottom: 20,
            }}
          >
            <Image
              resizeMode="contain"
              source={{
                uri: 'ic_left_arrow',
              }}
              style={[
                {
                  alignSelf: 'center',
                },
              ]}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 16,
              paddingLeft: 90,
              color: Colors.black,
              fontWeight: '500',
            }}
          >
            {textHeader}
          </Text>
        </View>
        <TextInput
          placeholder="Nhập user"
          placeholderTextColor={Colors.grey}
          style={styles.input}
          value={dataSearch}
          keyboardType="number-pad"
          // onChangeText={text => {
          //   this.setState({dataSearch: text}, () =>
          //   );
          // }}
        />

        {data.length > 0 && (
          <FlatList
            contentContainerStyle={{
              justifyContent: 'flex-start',
              paddingBottom: 20,
            }}
            initialNumToRender={10}
            data={data}
            extraData={data}
            // renderItem={({item}) => (
            //   <TouchableOpacity
            //     onPress={() => {
            //       closeModal();
            //     }}
            //     style={{
            //       paddingVertical: 10,
            //       flexDirection: 'row',
            //       alignItems: 'center',
            //     }}
            //   >
            //     {item.index ? (
            //       <Image
            //         style={{
            //           height: 24,
            //           width: 24,
            //           borderRadius: 24 / 2,
            //         }}
            //         source={{uri: 'ic_check_user'}}
            //       />
            //     ) : (
            //       <Image
            //         style={{
            //           height: 24,
            //           width: 24,
            //           borderRadius: 24 / 2,
            //         }}
            //         source={{uri: 'ic_check'}}
            //       />
            //     )}

            //     <Image
            //       style={{
            //         height: 32,
            //         width: 32,
            //         marginLeft: 8,
            //         borderRadius: 44,
            //       }}
            //       source={
            //         {
            //           // uri: baseAvatarURI + item.image,
            //         }
            //       }
            //     />

            //     <Text
            //       style={{
            //         marginLeft: 8,
            //         color: Colors.black,
            //         fontWeight: '400',
            //       }}
            //     >{`${item.username} - ${item.lastName} ${item.firstName}`}</Text>
            //   </TouchableOpacity>
            // )}
            renderItem={renderItem}
          />
        )}
      </View> */}
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 22,
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  input: {
    color: Colors.BLACK,
    width: '100%',
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.GRAY_DARK,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
});

export default MyModalSheet;
