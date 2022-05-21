import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async ({key, value}) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

export default storeData;
