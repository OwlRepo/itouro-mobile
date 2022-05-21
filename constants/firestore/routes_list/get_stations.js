import firestore from '@react-native-firebase/firestore';
const getStations = async ({routes}) => {
  const routeCollections = await firestore()
    .collection('routes')
    .doc(routes)
    .get();
  const routesStations = routeCollections.data().stations;
  return routesStations;
};

export default getStations;
