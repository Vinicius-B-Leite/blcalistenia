import {Button, ButtonProps} from '@/components';
import {useAppSelector} from '@/hooks';
import React from 'react';

const CreateSerie: React.FC<Pick<ButtonProps, 'onPress'>> = ({onPress}) => {
  const canEditWorkout = useAppSelector(state => state.workout.canEdit);
  if (!canEditWorkout) return <></>;
  return (
    <Button
      label="+"
      onPress={onPress}
      bg="contrast"
      width={25}
      height={25}
      alignSelf="center"
      borderRadius={'full'}
      marginVertical={14}
    />
  );
};

export default CreateSerie;
