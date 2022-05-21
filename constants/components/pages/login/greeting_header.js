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
import React from 'react';

export default function GreetingHeader() {
  return (
    <VStack>
      <Heading color={'cyan.500'} fontSize={'4xl'} letterSpacing={'xl'}>
        LOG IN
      </Heading>
      <Text>Fill out the form below to proceed.</Text>
    </VStack>
  );
}
