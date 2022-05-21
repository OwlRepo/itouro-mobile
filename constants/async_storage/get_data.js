import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async ({key}) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    } else {
      return '';
    }
  } catch (e) {
    console.log(e);
    // error reading value
  }
};
export default getData;
