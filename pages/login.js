import {
  VStack,
  Text,
  Heading,
  Toast,
  Input,
  Button,
  Box,
  ScrollView,
} from 'native-base';
import react from 'react';
import React from 'react';
import {getData} from '../constants/async_storage';
import {
  CustomerSupport,
  Form,
  GreetingHeader,
} from '../constants/components/pages/login';

export default function Login({navigation}) {
  return (
    <ScrollView>
      <VStack flex={1} padding={5} safeArea>
        <GreetingHeader />

        <Form navigation={navigation} />

        <VStack alignItems={'center'} marginTop={5}>
          <Text>Don't have an account?</Text>
          <Text
            onPress={() => navigation.navigate('Register')}
            fontWeight={'bold'}
            color={'cyan.500'}>
            Register now!
          </Text>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
