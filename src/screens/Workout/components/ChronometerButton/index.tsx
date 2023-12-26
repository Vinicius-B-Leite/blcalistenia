import React from 'react';

import {useAppSelector} from '@/hooks/useAppSelector';
import useChronometer from './useChronometer';
import Button from '../../../../components/Button/Button';

const ChronometerButton: React.FC = ({}) => {
  const timer = useAppSelector(state => state.workout.timer);
  const {handleFinishWorkout, startWorkout} = useChronometer();

  return (
    <Button
      label={
        timer
          ? `Terminar treino ${String(Math.floor(timer / 60)).padStart(
              2,
              '0',
            )}:${String(timer % 60).padStart(2, '0')}`
          : 'Iniciar treino'
      }
      onPress={() =>
        timer ? handleFinishWorkout(timer) : startWorkout()
      }></Button>
  );
};

export default ChronometerButton;
