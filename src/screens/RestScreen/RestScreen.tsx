import React, {useRef} from 'react';
import {Vibration} from 'react-native';
import CountDown, {CountDownRef} from './CountDown';
import {RootStackParamList} from '@/routes/Models';

import {RouteProp, useRoute} from '@react-navigation/native';
import {useAppNavigation} from '@/hooks';

import {Container, Box, Button} from '@/components/';

type Route = RouteProp<RootStackParamList, 'Rest'>;

export const RestScreen: React.FC = () => {
  const totalSeconds = useRoute<Route>().params?.totalSeconds || 30;
  const navigation = useAppNavigation();

  const countDownRef = useRef<CountDownRef>(null);

  const increaseSecondsInCountdown = () => {
    countDownRef.current?.addSecond(10);
  };

  const decreaseSecondsInCountdown = () => {
    countDownRef.current?.lessSecond(10);
  };

  const onChronometerFineshed = () => {
    navigation.goBack();
  };
  return (
    <Container justifyContent="center">
      <CountDown
        totalSeconds={totalSeconds as number}
        ref={countDownRef}
        onFineshed={onChronometerFineshed}
      />

      <Box flexDirection="row" gap={34} justifyContent="center" mt={34}>
        <Button label="+10" onPress={increaseSecondsInCountdown} flex={1} />
        <Button
          label="-10"
          onPress={decreaseSecondsInCountdown}
          bg="darkContrast"
          flex={1}
        />
      </Box>
    </Container>
  );
};
