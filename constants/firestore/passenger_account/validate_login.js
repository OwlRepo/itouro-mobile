import firestore from '@react-native-firebase/firestore';
import {storeData} from '../../async_storage/';
const validateLogin = async ({email, password}) => {
  const passengerCollection = await firestore()
    .collection('passenger_accounts')
    .doc(email)
    .get();

  if (passengerCollection.exists) {
    const passengerData = passengerCollection.data();
    const passengerPassword = passengerData.password;
    passengerPassword === password && storeData({key: 'email', value: email});
    return passengerPassword === password ? true : false;
  } else {
    return false;
  }
};

export default validateLogin;
