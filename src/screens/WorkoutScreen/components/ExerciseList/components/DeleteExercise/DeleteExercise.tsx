import {Icon} from '@/components';
import {useAppSelector} from '@/hooks';
import React from 'react';
import {TouchableOpacity, TouchableOpacityProps, View} from 'react-native';

// import { Container } from './styles';

const DeleteExercise: React.FC<Pick<TouchableOpacityProps, 'onPress'>> = ({
  onPress,
}) => {
  const canEditWorkout = useAppSelector(state => state.workout.canEdit);

  if (!canEditWorkout) return <></>;
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon family="FontAwesome" name="trash" size={18} color={'alert'} />
    </TouchableOpacity>
  );
};

export default DeleteExercise;
