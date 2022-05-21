import {Heading, Image, VStack} from 'native-base';
import React from 'react';

export default function ImageBanner() {
  return (
    <VStack flex={6} justifyContent={'center'} alignItems={'center'}>
      <Image
        source={{
          uri: 'https://scontent.fmnl17-4.fna.fbcdn.net/v/t1.15752-9/280124205_1406501743202579_2537218472341339044_n.png?_nc_cat=104&ccb=1-6&_nc_sid=ae9488&_nc_eui2=AeFdsK5T23-W65gpgluJPYGfdTN428MOFmZ1M3jbww4WZgIcSQwj1iJ581IC9idD83clrcqCI716JQ4EGr6gdw0y&_nc_ohc=2vVzZEUZo84AX-D5LQ7&_nc_ht=scontent.fmnl17-4.fna&oh=03_AVKXwPN9CQ24_RabQZK90Uhv9VIQgah8oXQbVYrguRUJNw&oe=62A8E4A0',
        }}
        alt="Alternate Text"
        size="2xl"
      />
    </VStack>
  );
}
