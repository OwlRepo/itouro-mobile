import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import {parse} from 'react-native-svg';
const payFare = async ({email, amount, type}) => {
  const passengerWallet = await firestore()
    .collection('wallets')
    .doc(email)
    .get();

  const passengerWalletData = passengerWallet.data();

  const passengerWalletAmount = passengerWalletData.credits;

  const motherWallet = await firestore()
    .collection('wallets')
    .doc('mother_wallet')
    .get();

  const motherWalletData = motherWallet.data();

  const motherWalletAmount = motherWalletData.credits;

  const deductWallet = await firestore()
    .collection('wallets')
    .doc(email)
    .update({
      credits: parseInt(parseInt(passengerWalletAmount) - parseInt(amount)),
    });

  const addToMotherWallet = await firestore()
    .collection('wallets')
    .doc('mother_wallet')
    .update({
      credits: parseInt(parseInt(motherWalletAmount) + parseInt(amount)),
    });

  const makeid = ({length}) => {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const date = new Date();

  const currentDate = moment().format('MMMM DD, YYYY');

  const recordTransaction = await firestore()
    .collection('history')
    .doc(email)
    .update({
      transactions: firestore.FieldValue.arrayUnion({
        amount: amount,
        current_date: currentDate,
        ref_no: makeid({length: 11}),
        type: type,
        user_email: email,
      }),
    });
};

export default payFare;
