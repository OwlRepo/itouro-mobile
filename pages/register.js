import {
  VStack,
  Text,
  Heading,
  Toast,
  Input,
  Button,
  Box,
  ScrollView,
  useToast,
} from 'native-base';
import react from 'react';
import React, {useState} from 'react';
import {getData} from '../constants/async_storage';
import {
  CustomerSupport,
  Form,
  GreetingHeader,
} from '../constants/components/pages/login';
import registerAccount from '../constants/firestore/passenger_account/register_account';

export default function Register({navigation}) {
  const [isValidEmail, setIsValidEmail] = useState(true);

  const [hidePassword, setHidePassword] = useState(true);

  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  const [firstName, setFirstName] = useState('');

  const [lastName, setLastName] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

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
    setEmail(text);
  };

  return (
    <ScrollView>
      <VStack flex={1} padding={5} safeArea>
        <VStack>
          <Heading color={'cyan.500'} fontSize={'4xl'} letterSpacing={'xl'}>
            REGISTER
          </Heading>
          <Text>Fill out the form below to proceed.</Text>
        </VStack>

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
            <Text>First Name</Text>
            <Input
              placeholder="Juan"
              onChangeText={text => setFirstName(text)}
            />
          </Box>

          <Box>
            <Text>Last Name</Text>
            <Input
              placeholder="Dela Cruz"
              onChangeText={text => setLastName(text)}
            />
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

          <Box>
            <Text>Confirm Password</Text>
            <Input
              type={hideConfirmPassword ? 'password' : 'text'}
              placeholder="******"
              onChangeText={text => setConfirmPassword(text)}
              InputRightElement={
                <Text
                  color={hideConfirmPassword ? 'cyan.500' : 'red.500'}
                  paddingX={3}
                  onPress={() => setHideConfirmPassword(!hideConfirmPassword)}>
                  {hideConfirmPassword ? 'SHOW' : 'HIDE'}
                </Text>
              }
            />
          </Box>

          <Button
            onPress={async () => {
              if (
                email === '' ||
                firstName === '' ||
                lastName === '' ||
                password === '' ||
                confirmPassword === ''
              ) {
                toast.show({
                  description: 'All fields are required.',
                });

                return;
              }

              if (confirmPassword === password) {
                await registerAccount({
                  email: email,
                  password: password,
                  firstname: firstName,
                  lastname: lastName,
                });
                toast.show({
                  description: 'Account Created Successfully',
                });
                navigation.navigate('Login');
              } else {
                toast.show({
                  description:
                    'Registration Failed. Please double check your form.',
                });
              }
            }}>
            <Text color={'white'} fontWeight={'bold'}>
              PROCEED
            </Text>
          </Button>
        </VStack>

        <VStack alignItems={'center'} marginTop={5}>
          <Text>Already have an account?</Text>
          <Text
            onPress={() => navigation.navigate('Login')}
            fontWeight={'bold'}
            color={'cyan.500'}>
            LOG IN
          </Text>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
