import firestore from '@react-native-firebase/firestore';
const getWalletCredits = async ({email}) => {
  const passengerCollection = await firestore()
    .collection('wallets')
    .doc(email)
    .get();

  if (passengerCollection.exists) {
    const passengerData = passengerCollection.data();
    const walletCredits = passengerData.credits;

    return walletCredits;
  } else {
    return false;
  }
};

export default getWalletCredits;
