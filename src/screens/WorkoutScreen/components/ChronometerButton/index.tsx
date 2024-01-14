import React from 'react';

import {useAppSelector} from '@/hooks';
import useChronometer from './useChronometer';
import {Button} from '@/components';
import {getMinutesFromSeconds, getSeconds} from '@/utils';

const ChronometerButton: React.FC = ({}) => {
  const timer = useAppSelector(state => state.workout.timer);
  const canEditWorkout = useAppSelector(state => state.workout.canEdit);
  const {handleFinishWorkout, startWorkout} = useChronometer();

  const minutes = getMinutesFromSeconds(timer || 0);
  const seconds = getSeconds(timer || 0);
  if (!canEditWorkout) return <></>;
  return (
    <Button
      label={timer ? `Terminar treino ${minutes}:${seconds}` : 'Iniciar treino'}
      onPress={() =>
        timer ? handleFinishWorkout(timer) : startWorkout()
      }></Button>
  );
};

export default ChronometerButton;
