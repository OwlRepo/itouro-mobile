import {Button, Heading, Text, VStack} from 'native-base';
import React from 'react';

export default function NavigationPanel({navigation}) {
  function pushRoute({screenName}) {
    navigation.navigate(screenName);
  }

  return (
    <VStack flex={4} alignItems={'stretch'} padding={5}>
      <Text>The best direction guide for </Text>
      <Heading>EVERY JUAN</Heading>

      <VStack space={5} marginY={12}>
        <Button onPress={() => pushRoute({screenName: 'Login'})}>
          <Text color={'white'} fontWeight={'bold'}>
            LOG IN
          </Text>
        </Button>

        <Button
          variant={'outline'}
          onPress={() => navigation.navigate('Register')}>
          <Text color={'cyan.500'} fontWeight={'bold'}>
            CREATE AN ACCOUNT
          </Text>
        </Button>
      </VStack>
    </VStack>
  );
}
