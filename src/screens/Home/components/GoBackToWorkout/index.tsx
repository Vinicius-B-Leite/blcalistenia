import React from 'react';

import {useTheme} from 'styled-components/native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {useAppSelector, useAppNavigation} from '@/hooks';
import {Box, BoxPressable, Text} from '@/components';

const GoBackToWorkout: React.FC = () => {
  const {colors, sizes} = useTheme();
  const navigation = useAppNavigation();

  const isWorkingout = useAppSelector(state => state.workout.isWorkingout);
  const currentWorkout = useAppSelector(state => state.workout.workout);
  const timer = useAppSelector(state => state.workout.timer);

  if (!isWorkingout || !timer) {
    return <></>;
  }

  return (
    <BoxPressable
      flexDirection="row"
      bg="contrast"
      borderTopLeftRadius={10}
      borderTopRightRadius={10}
      p={14}
      justifyContent="space-between"
      onPress={() =>
        navigation.navigate('HomeStack', {
          screen: 'Workout',
          params: {
            workout: currentWorkout,
          },
        })
      }>
      <Box>
        <Text preset="pLarge" bold>
          Voltar ao treino
        </Text>
        <Text preset="pMedium">
          {String(Math.floor(timer / 60)).padStart(2, '0')}:
          {String(timer % 60).padStart(2, '0')}
        </Text>
      </Box>
      <Ionicons
        name="arrow-forward"
        color={colors.text}
        size={sizes.icons.xlg}
      />
    </BoxPressable>
  );
};

export default GoBackToWorkout;
