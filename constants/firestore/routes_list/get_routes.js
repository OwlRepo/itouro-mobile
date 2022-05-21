import firestore from '@react-native-firebase/firestore';
const getRoutes = async () => {
  //   const routeNames = (
  //     await firestore().collectionGroup('routes').get()
  //   ).docs.forEach(value => {
  //     return [{id: value.id, name: value.data().name}];
  //   });
  var routes = [];
  var routesQuery = (
    await firestore().collectionGroup('routes').get()
  ).docs.forEach(value => routes.push({id: value.id, name: value.data().name}));
  console.log(routes);
  return routes;
};

export default getRoutes;
