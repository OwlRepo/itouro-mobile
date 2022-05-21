import {
  VStack,
  Text,
  Heading,
  Button,
  HStack,
  Spacer,
  Modal,
  Box,
  ScrollView,
  AlertDialog,
  useToast,
  Alert,
  IconButton,
  CloseIcon,
  Center,
} from 'native-base';
import React, {useState} from 'react';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {
  faClockRotateLeft,
  faList,
  faQrcode,
  faRoute,
  faUser,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {RNCamera} from 'react-native-camera';
import {storeData, getData} from '../constants/async_storage';
import getRoutes from '../constants/firestore/routes_list/get_routes';
import getStations from '../constants/firestore/routes_list/get_stations';
import getTransactionHistory from '../constants/firestore/passenger_account/get_transaction_history';
import getWalletCredits from '../constants/firestore/passenger_account/get_wallet_credits';
import getFareMatrix from '../constants/firestore/fare_matrix/get_fare_matrix';
import payFare from '../constants/firestore/transaction/pay_fare';
import MapViewDirections from 'react-native-maps-directions';

import {PermissionsAndroid} from 'react-native';

import Geolocation from '@react-native-community/geolocation';

export default function Maps({navigation}) {
  React.useEffect(async () => {
    const isLoggedIn = await getData({key: 'email'});
    isLoggedIn === '' && navigation.navigate('Landing');
    () =>
      navigation.addListener('beforeRemove', e => {
        if (!hasUnsavedChanges) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();
      });
  }, []);

  const toast = useToast();

  const [currentLat, setCurrentLat] = useState(36.78825);

  const [currentLong, setCurrentLong] = useState(-122.2342);

  const [showChangeRouteModal, setShowChangeRouteModal] = useState(false);

  const [showWalletModal, setshowWalletModal] = useState(false);

  const [showPayQRModal, setshowPayQRModal] = useState(false);

  const [showTransactionHistoryModal, setshowTransactionHistoryModal] =
    useState(false);

  const [showFareMatrixModal, setShowFareMatrixModal] = useState(false);

  const [showLogoutAlertModal, setShowLogoutAlertModal] = useState(false);

  const [qrCodeScanned, setQrCodeScanned] = useState(false);

  const [farePrice, setFarePrice] = useState('----');

  const [selectedStation, setSelectedStation] = useState(0);

  const [stations, setStations] = useState(null);

  const [transactions, setTransactions] = useState([]);

  const [routes, setRoutes] = useState(null);

  const [routeName, setRouteName] = useState('Gasak - Recto');

  const [walletCredits, setWalletCredits] = useState('-----');

  const [isInvalidCode, setIsInvalidCode] = useState(false);

  const [fareMatrix, setFareMatrix] = useState({});

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLong(currentLongitude);

        //Setting Longitude state
        setCurrentLat(currentLatitude);
      },
      error => {
        console.warn(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  React.useEffect(async () => {
    var userEmail = await getData({key: 'email'});
    setStations(await getStations({routes: 'ROUTE 1'}));
    setRoutes(await getRoutes());
    setTransactions(await getTransactionHistory({email: userEmail}));
    setWalletCredits(await getWalletCredits({email: userEmail}));
    setFareMatrix(await getFareMatrix({route: 'ROUTE 1'}));
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          getOneTimeLocation();
        } else {
          setLocationStatus('Permission Denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };
    requestLocationPermission();
    return (
      () => clearInterval(componentUpdates), Geolocation.clearWatch(watchID)
    );
  }, []);

  const MapRouteNavigation = () => {
    return (
      <VStack>
        <HStack>
          <HStack
            opacity={0.9}
            alignItems={'center'}
            flex={1}
            margin={'2'}
            padding={'3'}
            borderRadius={'lg'}
            backgroundColor={'white'}
            shadow={'9'}>
            <VStack flex={1}>
              <Text fontSize={'xs'}>Current Route</Text>
              <Text fontSize={'lg'} fontWeight={'bold'}>
                {routeName}
              </Text>
            </VStack>
            <Button
              padding={'3'}
              borderRadius={'lg'}
              shadow={'3'}
              onPress={() => setShowChangeRouteModal(!showChangeRouteModal)}>
              <Text color={'white'} fontWeight={'bold'}>
                Change Route
              </Text>
            </Button>
          </HStack>
        </HStack>
        <HStack alignItems={'center'} space={'3'}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {stations !== null &&
              stations.map((station, index) => {
                return (
                  <Button
                    shadow={'3'}
                    opacity={0.9}
                    borderRadius={'full'}
                    key={index}
                    onPress={() => setSelectedStation(index)}
                    backgroundColor={
                      selectedStation === index ? 'cyan.500' : 'white'
                    }
                    paddingY={'2'}
                    marginX={'3'}
                    marginY={'2'}>
                    <Text
                      color={selectedStation === index ? 'white' : 'black'}
                      fontWeight={
                        selectedStation === index ? 'bold' : 'normal'
                      }>
                      {station.id}
                    </Text>
                  </Button>
                );
              })}
          </ScrollView>
        </HStack>
      </VStack>
    );
  };

  const TransactionActions = () => {
    return (
      <HStack
        justifyContent={'space-between'}
        alignItems={'center'}
        padding={'3'}
        margin={'5'}
        backgroundColor={'transparent'}
        borderRadius={'lg'}>
        <Button
          onPress={async () => {
            var userEmail = await getData({key: 'email'});
            setWalletCredits(await getWalletCredits({email: userEmail}));
            setshowWalletModal(!showWalletModal);
          }}
          borderRadius={'lg'}
          backgroundColor={'white'}
          padding={'3'}
          shadow={'3'}>
          <FontAwesomeIcon color={'grey'} size={20} icon={faUser} />
        </Button>

        <Button
          onPress={() => setshowPayQRModal(!showPayQRModal)}
          borderRadius={'full'}
          padding={'5'}
          shadow={'3'}>
          <FontAwesomeIcon color={'#ffffff'} size={30} icon={faQrcode} />
        </Button>

        <Button
          onPress={async () => {
            var userEmail = await getData({key: 'email'});
            setTransactions(await getTransactionHistory({email: userEmail}));
            setshowTransactionHistoryModal(!showTransactionHistoryModal);
          }}
          borderRadius={'lg'}
          backgroundColor={'white'}
          padding={'3'}
          shadow={'3'}>
          <FontAwesomeIcon color={'grey'} size={20} icon={faClockRotateLeft} />
        </Button>
      </HStack>
    );
  };

  const ChangeRouteModal = ({content, title, headerIcon}) => {
    return (
      <Modal
        isOpen={showChangeRouteModal}
        onClose={() => setShowChangeRouteModal(!showChangeRouteModal)}>
        <Modal.Content maxWidth={'90%'}>
          <Modal.CloseButton />
          <Modal.Header>
            <HStack space={'3'}>
              <FontAwesomeIcon size={20} icon={headerIcon} />
              <Text>{title}</Text>
            </HStack>
          </Modal.Header>
          <Modal.Body>{content}</Modal.Body>
        </Modal.Content>
      </Modal>
    );
  };

  const WalletModal = ({content, title, headerIcon}) => {
    return (
      <Modal
        isOpen={showWalletModal}
        onClose={() => setshowWalletModal(!showWalletModal)}>
        <Modal.Content maxWidth={'90%'}>
          <Modal.CloseButton />
          <Modal.Header>
            <HStack space={'3'}>
              <FontAwesomeIcon size={20} icon={headerIcon} />
              <Text>{title}</Text>
            </HStack>
          </Modal.Header>
          <Modal.Body>{content}</Modal.Body>
        </Modal.Content>
      </Modal>
    );
  };

  const PayQrModal = ({content, title, headerIcon}) => {
    return (
      <Modal
        isOpen={showPayQRModal}
        onClose={() => {
          setQrCodeScanned(false);
          setFarePrice('----');
          setshowPayQRModal(!showPayQRModal);
        }}>
        <Modal.Content maxWidth={'90%'}>
          <Modal.CloseButton />
          <Modal.Header>
            <HStack space={'3'}>
              <FontAwesomeIcon size={20} icon={headerIcon} />
              <Text>{title}</Text>
            </HStack>
          </Modal.Header>
          <Modal.Body>{content}</Modal.Body>
        </Modal.Content>
      </Modal>
    );
  };

  const TransactionHistoryModal = ({content, title, headerIcon}) => {
    return (
      <Modal
        isOpen={showTransactionHistoryModal}
        onClose={() =>
          setshowTransactionHistoryModal(!showTransactionHistoryModal)
        }>
        <Modal.Content maxWidth={'90%'}>
          <Modal.CloseButton />
          <Modal.Header>
            <HStack space={'3'}>
              <FontAwesomeIcon size={20} icon={headerIcon} />
              <Text>{title}</Text>
            </HStack>
          </Modal.Header>
          <Modal.Body>{content}</Modal.Body>
        </Modal.Content>
      </Modal>
    );
  };

  const FareMatrixModal = ({content, title, headerIcon}) => {
    return (
      <Modal
        isOpen={showFareMatrixModal}
        onClose={() => setShowFareMatrixModal(!showFareMatrixModal)}>
        <Modal.Content maxWidth={'90%'}>
          <Modal.CloseButton />
          <Modal.Header>
            <HStack space={'3'}>
              <FontAwesomeIcon size={20} icon={headerIcon} />
              <Text>{title}</Text>
            </HStack>
          </Modal.Header>
          <Modal.Body>{content}</Modal.Body>
        </Modal.Content>
      </Modal>
    );
  };

  const FareMatrixContents = (
    <VStack alignItems={'stretch'} flex={1} paddingY={'5'} paddingX={'16'}>
      <HStack alignItems={'center'} justifyContent={'space-between'}>
        <Text>Destination</Text>
        <Heading fontSize={'3xl'}>{'P ' + fareMatrix.destinationPrice}</Heading>
      </HStack>
      <HStack alignItems={'center'} justifyContent={'space-between'}>
        <Text>Full Travel</Text>
        <Heading fontSize={'3xl'}>{'P ' + fareMatrix.fullTravelPrice}</Heading>
      </HStack>
    </VStack>
  );

  const ChangeRouteContents = (
    <VStack flex={1} maxHeight={'80%'} overflow={'scroll'}>
      {routes !== null &&
        routes.map((route, index) => {
          return (
            <HStack
              key={index}
              padding={'5'}
              justifyContent={'space-between'}
              alignItems={'center'}>
              <Text fontSize={'lg'} fontWeight={'bold'}>
                {route.name}
              </Text>
              <Button
                onPress={async () => {
                  setStations(await getStations({routes: route.id}));
                  setFareMatrix(await getFareMatrix({routes: route.id}));
                  setShowChangeRouteModal(!showChangeRouteModal);
                  setRouteName(route.name);
                  setSelectedStation(0);
                }}>
                <Text color={'white'} fontWeight={'bold'}>
                  Select
                </Text>
              </Button>
            </HStack>
          );
        })}
    </VStack>
  );

  const AccountContents = (
    <>
      <VStack alignItems={'center'} flex={1} paddingY={'5'} paddingX={'16'}>
        <Text>PHP</Text>
        <Heading fontSize={'5xl'}>{walletCredits}</Heading>
      </VStack>
      <VStack flex={1} space={'2'}>
        <Button onPress={() => setShowFareMatrixModal(true)}>
          <Text color={'white'} fontWeight={'bold'}>
            Fare Prices
          </Text>
        </Button>

        <Button
          backgroundColor={'red.500'}
          onPress={() => setShowLogoutAlertModal(true)}>
          <Text color={'white'} fontWeight={'bold'}>
            Logout
          </Text>
        </Button>
      </VStack>
    </>
  );

  const [travelType, setTravelType] = useState('Full Travel');
  const barcodeRecognized = qrcode => {
    setQrCodeScanned(true);
    setTravelType(qrcode.data);
    if (qrcode.data === 'Full Travel') {
      setFarePrice('25.00');
    } else if (qrcode.data === 'Destination') {
      setFarePrice('11.00');
    } else {
      setIsInvalidCode(true);
    }
  };

  const PayQrContents = (
    <VStack alignItems={'stretch'} minWidth={'100%'} padding={'2'}>
      <VStack
        minHeight={qrCodeScanned === false ? '64' : '0'}
        flex={qrCodeScanned === false ? 1 : 0}
        padding={qrCodeScanned === false ? '10' : '0'}
        alignItems={'center'}>
        {qrCodeScanned === false ? (
          <RNCamera
            style={{
              height: '100%',
              width: '100%',
            }}
            onBarCodeRead={barcodeRecognized}
            // onGoogleVisionBarcodesDetected={barcodeRecognized}
          />
        ) : (
          <Text fontWeight={'bold'}>{travelType}</Text>
        )}
      </VStack>
      <VStack marginY={'5'}>
        <Text alignSelf={'center'}>Fare Price:</Text>

        <Text alignSelf={'center'} fontWeight={'bold'} fontSize={'xl'}>
          {farePrice}
        </Text>
      </VStack>
      <Button
        // disabled={!qrCodeScanned}
        backgroundColor={qrCodeScanned ? 'cyan.500' : 'gray.500'}
        onPress={async () => {
          setshowPayQRModal(false);
          var userEmail = await getData({key: 'email'});
          payFare({email: userEmail, amount: '11.00', type: travelType}).then(
            data => setQrCodeScanned(false),
            setTransactions(await getTransactionHistory({email: userEmail})),
            setWalletCredits(await getWalletCredits({email: userEmail})),
            setFarePrice('----'),
          );

          setTransactions(await getTransactionHistory({email: userEmail}));
          setWalletCredits(await getWalletCredits({email: userEmail}));
          toast.show({description: 'Payment Successful'});
        }}>
        <Text color="white" fontWeight={'bold'}>
          PAY FARE
        </Text>
      </Button>
    </VStack>
  );

  const TransactionHistoryContents = (
    <VStack flex={1} maxHeight={'80%'} overflow={'scroll'}>
      {transactions !== null &&
        transactions
          .slice(0)
          .reverse()
          .map((transaction, index) => {
            return (
              <HStack
                key={index}
                padding={'5'}
                justifyContent={'space-between'}
                alignItems={'center'}>
                <VStack>
                  <Text fontSize={'lg'} fontWeight={'bold'}>
                    {transaction.type}
                  </Text>
                  <Text fontSize={'2xs'}>Ref No.: {transaction.ref_no}</Text>
                  <Text fontSize={'2xs'}>Date: {transaction.current_date}</Text>
                </VStack>
                <HStack space={'2'}>
                  <Text fontWeight={'bold'}>PHP</Text>
                  <Text fontWeight={'bold'}>{transaction.amount}</Text>
                </HStack>
              </HStack>
            );
          })}
      {transactions.length === 0 && (
        <Center>
          <Text>No Transaction Record.</Text>
        </Center>
      )}
    </VStack>
  );

  const Modals = () => {
    return (
      <>
        {isInvalidCode && <InvalidQRCode />}
        <ChangeRouteModal
          headerIcon={faRoute}
          title={'Change Route'}
          content={ChangeRouteContents}
        />
        <WalletModal
          headerIcon={faUser}
          title={'My Account'}
          content={AccountContents}
        />
        <PayQrModal
          headerIcon={faQrcode}
          title={'QR Pay Fare'}
          content={PayQrContents}
        />
        <TransactionHistoryModal
          headerIcon={faClockRotateLeft}
          title={'Transaction History'}
          content={TransactionHistoryContents}
        />
        <FareMatrixModal
          headerIcon={faList}
          title={'Fare Matrix'}
          content={FareMatrixContents}
        />
        <AlertDialog
          isOpen={showLogoutAlertModal}
          onClose={() => setShowLogoutAlertModal(false)}>
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Are you sure?</AlertDialog.Header>
            <AlertDialog.Body>
              Are you sure you want to log out your account?
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button
                  variant="unstyled"
                  colorScheme="coolGray"
                  onPress={() => setShowLogoutAlertModal(false)}>
                  Cancel
                </Button>
                <Button
                  colorScheme="danger"
                  onPress={() => {
                    setShowLogoutAlertModal(false);
                    storeData({key: 'email', value: ''});
                    navigation.navigate('Login');
                  }}>
                  Logout
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </>
    );
  };

  const InvalidQRCode = () => {
    return (
      <Alert w="100%" status={'error'}>
        <VStack space={2} flexShrink={1} w="100%">
          <HStack flexShrink={1} space={2} justifyContent="space-between">
            <HStack space={2} flexShrink={1}>
              <Alert.Icon mt="1" />
              <Text fontSize="md" color="coolGray.800">
                {'Invalid QR Code'}
              </Text>
            </HStack>
            <IconButton
              variant="unstyled"
              _focus={{
                borderWidth: 0,
              }}
              icon={<CloseIcon size="3" />}
              _icon={{
                color: 'coolGray.600',
              }}
              onPress={() => {
                setIsInvalidCode(false);
              }}
            />
          </HStack>
        </VStack>
      </Alert>
    );
  };

  return (
    <VStack flex={1} alignItems={'stretch'} backgroundColor={'white'} safeArea>
      <MapView
        style={{
          flex: 1,
          position: 'absolute',
          top: 1,
          right: 1,
          bottom: 1,
          left: 1,
          zIndex: -1,
        }}
        initialRegion={{
          latitude: parseFloat(currentLat),
          longitude: parseFloat(currentLong),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={{
          latitude: parseFloat(currentLat),
          longitude: parseFloat(currentLong),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: parseFloat(currentLat),
            longitude: parseFloat(currentLong),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          title={'Origin'}
          description={'Your current location'}
        />

        {stations !== null && (
          <Marker
            coordinate={{
              latitude: parseFloat(stations[selectedStation].lat),
              longitude: parseFloat(stations[selectedStation].long),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            title={'Destination'}
            description={stations[selectedStation].id}
          />
        )}

        {stations !== null && (
          <MapViewDirections
            apikey={'AIzaSyCXLk5dBwesfhnAakJXU1FB8qoISBVH1rw'}
            origin={{
              latitude: parseFloat(currentLat),
              longitude: parseFloat(currentLong),
            }}
            destination={{
              latitude: parseFloat(stations[selectedStation].lat),
              longitude: parseFloat(stations[selectedStation].long),
            }}
            strokeWidth={5}
            strokeColor="#0a95f2"
          />
        )}
      </MapView>
      <MapRouteNavigation />
      <Spacer />
      <TransactionActions />
      <Modals />
    </VStack>
  );
}
