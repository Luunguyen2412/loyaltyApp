import AsyncStorage from '@react-native-async-storage/async-storage';

export const KEY_ACCESS_TOKEN = 'access_token';

export const getItem = key => {
  return new Promise(resolve => {
    AsyncStorage.getItem(key, (error, result) => {
      if (!result) {
        return resolve(result);
      }

      resolve(result);
    });
  });
};

export const setItem = (key, value) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.setItem(key, value, (error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result);
    });
  });
};

// export const setItem = async value => {
//   try {
//     await AsyncStorage.setItem('my-key', value);
//   } catch (e) {
//     // saving error
//   }
// };

// export const getItem = async () => {
//   try {
//     const value = await AsyncStorage.getItem('my-key');
//     if (value !== null) {
//       // value previously stored
//     }
//   } catch (e) {
//     // error reading value
//   }
// };
