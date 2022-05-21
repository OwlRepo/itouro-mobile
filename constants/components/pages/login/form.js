import {
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  Switch,
  Text,
  useToast,
  VStack,
} from 'native-base';

import React, {useState} from 'react';
import {validateLogin} from '../../../firestore/passenger_account';
export default function Form({navigation}) {
  const [isValidEmail, setIsValidEmail] = useState(true);

  const [hidePassword, setHidePassword] = useState(true);

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const toast = useToast();

  const pushRoute = async ({screenName}) => {
    if (await validateLogin({email: email, password: password})) {
      toast.show({
        description: 'Login Success',
      });
      navigation.navigate(screenName);
    } else {
      toast.show({
        description: 'Login Failed',
      });
    }
  };

  const validateEmailFormat = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      setIsValidEmail(false);
    } else {
      setIsValidEmail(true);
    }
    setEmail(text);
  };

  return (
    <VStack space={5} marginTop={5}>
      <Box>
        <Text>Email</Text>
        <Input
          placeholder="youremail@sample.com"
          onChangeText={validateEmailFormat}
        />
        {!isValidEmail && (
          <Text alignSelf={'flex-end'} color={'red.500'} marginTop={2}>
            Invalid Email Format
          </Text>
        )}
      </Box>

      <Box>
        <Text>Password</Text>
        <Input
          type={hidePassword ? 'password' : 'text'}
          placeholder="******"
          onChangeText={text => setPassword(text)}
          InputRightElement={
            <Text
              color={hidePassword ? 'cyan.500' : 'red.500'}
              paddingX={3}
              onPress={() => setHidePassword(!hidePassword)}>
              {hidePassword ? 'SHOW' : 'HIDE'}
            </Text>
          }
        />
      </Box>

      <Button onPress={() => pushRoute({screenName: 'Maps'})}>
        <Text color={'white'} fontWeight={'bold'}>
          PROCEED
        </Text>
      </Button>
    </VStack>
  );
}
