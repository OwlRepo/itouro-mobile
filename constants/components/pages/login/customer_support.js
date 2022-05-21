import {Text, VStack} from 'native-base';

import React from 'react';
export default function CustomerSupport() {
  return (
    <VStack alignItems={'center'} marginTop={5}>
      <Text>Having trouble logging in?</Text>
      <Text fontWeight={'bold'} color={'cyan.500'}>
        Contact Customer Support
      </Text>
    </VStack>
  );
}
