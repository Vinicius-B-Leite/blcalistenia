import {FlashList} from '@shopify/flash-list';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import ExerciseInWorkoutItem from '../ExerciseInWorkoutItem';

import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../features/store';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../../routes/Models';
import {addSerie, removeExercise} from '@/features/Workout/workoutSlicer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useTheme} from 'styled-components/native';
import {useAppNavigation} from '@/hooks/useAppNavigation';
import {useAppSelector} from '@/hooks/useAppSelector';
import Box, {BoxPressable} from '@/components/Box/Box';
import Text from '@/components/Text/Text';
import Button from '@/components/Button/Button';

const ExerciseList: React.FC = () => {
  const theme = useTheme();

  const workout = useAppSelector(state => state.workout.workout);
  const navigation = useAppNavigation();
  const dispatch = useDispatch();

  return (
    <Box flex={1}>
      <FlashList
        data={workout.exercises}
        extraData={workout.exercises}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        estimatedItemSize={workout?.exercises?.length || 10}
        renderItem={({item}) => (
          <ExerciseInWorkoutItem
            item={item}
            createSerieBtn={
              <Button
                label="+"
                onPress={() => dispatch(addSerie(item))}
                bg="contrast"
                width={25}
                height={25}
                alignSelf="center"
                borderRadius={'full'}
                marginVertical={14}
              />
            }
            showDeleteSerieButton={true}
            deleteExerciseBtn={
              <TouchableOpacity onPress={() => dispatch(removeExercise(item))}>
                <FontAwesome
                  name="trash"
                  size={theme.sizes.icons.sm}
                  color={theme.colors.alert}
                />
              </TouchableOpacity>
            }
          />
        )}
        ListFooterComponent={() => (
          <BoxPressable
            alignSelf="center"
            onPress={() =>
              navigation.navigate('HomeStack', {screen: 'AddExercise'})
            }>
            <Text
              preset="pMedium"
              textDecorationLine="underline"
              color="contrast">
              Adiconar exercício
            </Text>
          </BoxPressable>
        )}
      />
    </Box>
  );
};

export default ExerciseList;
