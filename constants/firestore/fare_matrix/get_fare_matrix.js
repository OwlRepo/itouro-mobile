import firestore from '@react-native-firebase/firestore';

const getFareMatrix = async ({route}) => {
  const destinationCollection = await firestore()
    .collection('fare_matrix')
    .doc(route)
    .collection('fare')
    .doc('destination')
    .get();

  const fullTravelCollection = await firestore()
    .collection('fare_matrix')
    .doc(route)
    .collection('fare')
    .doc('full_travel')
    .get();

  if (destinationCollection.exists && fullTravelCollection.exists) {
    const destinationData = destinationCollection.data();
    const fullTravelData = fullTravelCollection.data();

    const destinationPrice = destinationData.price;
    const fullTravelPrice = fullTravelData.price;

    return {
      destinationPrice: destinationPrice,
      fullTravelPrice: fullTravelPrice,
    };
  } else {
    return false;
  }
};

export default getFareMatrix;
