import React from 'react';

import {useAppSelector, useAppNavigation, useAppTheme} from '@/hooks';
import {Box, BoxPressable, Icon, Text} from '@/components';
import {getMinutesFromSeconds, getSeconds} from '@/utils';

const GoBackToWorkout: React.FC = () => {
  const {colors, spacing} = useAppTheme();
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
          {getMinutesFromSeconds(timer)}:{getSeconds(timer)}
        </Text>
      </Box>
      <Icon family="Ionicons" name="arrow-forward" color={'text'} size={24} />
    </BoxPressable>
  );
};

export default GoBackToWorkout;
