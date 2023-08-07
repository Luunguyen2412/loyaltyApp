// import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
// import Colors from '../constants/Colors';
// import {Text, View, TouchableOpacity, Dimensions, FlatList} from 'react-native';
// import {BottomSheetModal} from '@gorhom/bottom-sheet';
// import MyTextInput from './MyTextInput';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// let width = Dimensions.get('window').width;

// type MyBottomSheetProps = {
//   ref;
//   index;
//   snapPoints;
//   onChange: () => void;
//   search;
//   searchPlaceholder;
//   data;
//   renderItem: () => void;
// };

// const MyBottomSheet = ({
//   ref,
//   index,
//   snapPoints,
//   onChange,
//   search,
//   searchPlaceholder,
//   data,
//   renderItem,
// }: MyBottomSheetProps) => {
//   return (
//     <BottomSheetModal
//       ref={ref}
//       index={index}
//       snapPoints={snapPoints}
//       onChange={onChange}
//     >
//       <View
//         style={{
//           flex: 1,
//           alignItems: 'center',
//         }}
//       >
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//           }}
//         >
//           <MyTextInput
//             style={{
//               paddingHorizontal: 10,
//               alignItems: 'center',
//               borderWidth: 1,
//               flexDirection: 'row',
//               height: 50,
//               width: width * 0.7,
//               borderRadius: 10,
//               borderColor: Colors.grey,
//               marginBottom: 15,
//               color: Colors.black,
//             }}
//             placeholder={searchPlaceholder}
//             value={search}
//             onChangeText={value => {
//               // setSearch(value);
//             }}
//           />
//           <TouchableOpacity
//             onPress={() => {
//               // searchItem(search);
//             }}
//             style={{
//               justifyContent: 'center',
//               paddingHorizontal: 15,
//               height: 50,
//               backgroundColor: Colors.PRIMARY,
//               borderRadius: 10,
//             }}
//           >
//             <FontAwesome5 name={'search'} size={16} color={Colors.white} />
//           </TouchableOpacity>
//         </View>
//         <FlatList data={data} renderItem={renderItem} />
//       </View>
//     </BottomSheetModal>
//   );
// };
// export default MyBottomSheet;
