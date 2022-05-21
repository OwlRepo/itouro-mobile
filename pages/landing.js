import {VStack, Text, Heading, Button} from 'native-base';
import React from 'react';
import {
  ImageBanner,
  NavigationPanel,
} from '../constants/components/pages/landing';
export default function Landing({navigation}) {
  return (
    <VStack flex={1} alignItems={'stretch'} backgroundColor={'white'} safeArea>
      <ImageBanner />
      <NavigationPanel navigation={navigation} />
    </VStack>
  );
}
