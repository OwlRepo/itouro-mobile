import firestore from '@react-native-firebase/firestore';
import {storeData} from '../../async_storage/';
const registerAccount = async ({email, password, firstname, lastname}) => {
  const passengerCollection = await firestore()
    .collection('passenger_accounts')
    .doc(email)
    .set({
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname,
    });

  const walletCollection = await firestore()
    .collection('wallets')
    .doc(email)
    .set({
      credits: 200,
    });
};

export default registerAccount;
