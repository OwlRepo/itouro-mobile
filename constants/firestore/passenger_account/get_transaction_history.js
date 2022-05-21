import firestore from '@react-native-firebase/firestore';
import {storeData} from '../../async_storage/';
const getTransactionHistory = async ({email}) => {
  const passengerCollection = await firestore()
    .collection('history')
    .doc(email)
    .get();

  if (passengerCollection.exists) {
    const passengerData = passengerCollection.data();
    const transactions = passengerData.transactions;
    console.log(transactions);
    return transactions;
  } else {
    const createPassengerTransactionHistory = await firestore()
      .collection('history')
      .doc(email)
      .set({
        transactions: firestore.FieldValue.arrayUnion({}),
      });

    const passengerData = passengerCollection.data();
    const transactions = passengerData.transactions;

    console.log(transactions);

    return transactions;
  }
};

export default getTransactionHistory;
