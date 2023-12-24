import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {RootStackParamList} from '../../../../../routes/Models';
import {useAppNavigation} from '@/hooks/useAppNavigation';
import NewWorkoutBanner from '@/assets/newWorkoutBanner.png';
import Box, {BoxPressable} from '@/components/Box/Box';
import {Image} from '@/components/Image/Image';
import Text from '@/components/Text/Text';

type Navigation = StackNavigationProp<RootStackParamList, 'Home'>;

const ListEmptyComponent: React.FC = () => {
  const navigation = useAppNavigation();

  const navigateToWorkout = () => {
    navigation.navigate('HomeStack', {
      screen: 'Workout',
      params: {workout: undefined},
    });
  };
  return (
    <BoxPressable
      height={228}
      width={205}
      borderRadius={10}
      backgroundColor="primaryBg"
      marginLeft={34}
      zIndex={-1}
      onPress={navigateToWorkout}>
      <Image
        height={160}
        borderTopLeftRadius={10}
        borderTopRightRadius={10}
        source={NewWorkoutBanner}
        resizeMode={FastImage.resizeMode.cover}
      />

      <Text
        preset="pMedium"
        textAlignVertical="center"
        style={{flex: 1, alignSelf: 'center'}}>
        Crie um treino
      </Text>
    </BoxPressable>
  );
};

export default ListEmptyComponent;
