import React from 'react';


import {useAppNavigation} from '@/hooks';
import {BoxPressable, Text} from '@/components';


const CreateWorkoutButton: React.FC = () => {
  const navigation = useAppNavigation();

  const navigateToWorkout = () => {
    navigation.navigate('HomeStack', {
      screen: 'Workout',
      params: {workout: undefined},
    });
  };

  return (
    <BoxPressable
      borderWidth={1}
      borderColor="contrast"
      borderRadius={'full'}
      width={30}
      height={30}
      alignItems="center"
      justifyContent="center"
      onPress={navigateToWorkout}>
      <Text preset="pMedium" color="contrast" bold>
        +
      </Text>
    </BoxPressable>
  );
};

export default CreateWorkoutButton;