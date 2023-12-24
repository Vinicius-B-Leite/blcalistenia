import React, {memo} from 'react';
import FastImage from 'react-native-fast-image';
import {WorkoutType} from '../../../../models/WorkoutType';
import * as S from './styles';
import {useAppNavigation} from '@/hooks/useAppNavigation';
import useWorkout from './useWorkout';
import ImageNotFound from '@/assets/imageNotFound.png';
import {BoxPressable, BoxType} from '../../../../components/Box/Box';
import {Image} from '../../../../components/Image/Image';
import Text from '@/components/Text/Text';

type Props = BoxType & {
  workout: WorkoutType;
};

const Workout: React.FC<Props> = ({workout, ...props}) => {
  const navigation = useAppNavigation();
  const {handleDelete} = useWorkout();

  const navigateToWorkout = () => {
    navigation.navigate('HomeStack', {
      screen: 'Workout',
      params: {workout: workout},
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
      onLongPress={() => handleDelete(workout.title, workout._id)}
      {...props}>
      <Image
        height={160}
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
        style={{flex: 1, alignSelf: 'center'}}>
        {workout?.title}
      </Text>
    </BoxPressable>
  );
};

export default memo(Workout, (p, n) => Object.is(p, n));
