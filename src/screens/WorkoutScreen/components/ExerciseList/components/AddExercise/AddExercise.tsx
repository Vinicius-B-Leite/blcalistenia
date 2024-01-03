import {BoxPressable, BoxPressableProps, Text} from '@/components';
import {useAppSelector} from '@/hooks';
import React from 'react';
import {View} from 'react-native';

// import { Container } from './styles';

const AddExercise: React.FC<Pick<BoxPressableProps, 'onPress'>> = ({
  onPress,
}) => {
  const canEditWorkout = useAppSelector(state => state.workout.canEdit);

  if (!canEditWorkout) return <></>;
  return (
    <BoxPressable mb={34} mt={24} alignSelf="center" onPress={onPress}>
      <Text preset="pMedium" textDecorationLine="underline" color="contrast">
        Adiconar exercício
      </Text>
    </BoxPressable>
  );
};

export default AddExercise;
