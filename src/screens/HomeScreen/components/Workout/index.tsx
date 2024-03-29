import React, {memo} from 'react';
import FastImage from 'react-native-fast-image';
import {WorkoutType} from '@/models';

import {useAppNavigation} from '@/hooks';
import useWorkout from './useWorkout';
import ImageNotFound from '@/assets/imageNotFound.png';
import {BoxPressable, BoxType, Text, Image} from '@/components';
import {suggests} from '@/constants';

type Props = BoxType & {
  workout: WorkoutType;
  scrollToTop?: () => void | undefined;
};

const Workout: React.FC<Props> = ({
  workout,
  scrollToTop = () => {},
  ...props
}) => {
  const navigation = useAppNavigation();
  const {handleDelete} = useWorkout();
  const isWorkoutSuggest =
    suggests.findIndex(v => JSON.parse(v.workout)._id == workout._id) > -1;

  const navigateToWorkout = () => {
    navigation.navigate('HomeStack', {
      screen: 'Workout',
      params: {workout: workout},
      initial: true,
    });
  };
  return (
    <BoxPressable
      height={228}
      width={205}
      borderRadius={10}
      backgroundColor="primaryBg"
      onPress={navigateToWorkout}
      marginHorizontal={14}
      zIndex={-1}
      onLongPress={() =>
        !isWorkoutSuggest &&
        handleDelete(workout.title, workout._id, scrollToTop)
      }
      {...props}>
      <Image
        height={170}
        borderTopLeftRadius={10}
        borderTopRightRadius={10}
        source={
          workout?.banner?.length > 0 ? {uri: workout.banner} : ImageNotFound
        }
        resizeMode={FastImage.resizeMode.cover}
      />

      <Text
        preset="pMedium"
        textAlignVertical="center"
        style={{flex: 1, alignSelf: 'center'}}
        numberOfLines={1}
        marginHorizontal={24}>
        {workout?.title}
      </Text>
    </BoxPressable>
  );
};

export default memo(Workout, (p, n) => Object.is(p, n));
