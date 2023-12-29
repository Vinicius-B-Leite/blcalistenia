import {FlashList} from '@shopify/flash-list';
import React, {useMemo} from 'react';

import Exercise from '../Exercise';

import Animated, {
  FadeInDown,
  Layout,
  SlideInRight,
  SlideOutRight,
} from 'react-native-reanimated';
import {useExerciseList} from '../../hooks/useExerciseList';
import {BoxPressable, Box, Text} from '@/components';

type Props = {
  openModal: () => void;
};
const ExercisesList: React.FC<Props> = ({openModal}) => {
  const {exercisList, exercisesSearched, searchExerciseInput} =
    useExerciseList();

  return (
    <Box mt={24} flex={1}>
      <FlashList
        estimatedItemSize={exercisList?.length || 30}
        data={searchExerciseInput ? exercisesSearched : exercisList}
        keyExtractor={item => String(item.name)}
        renderItem={({item}) => (
          <Animated.View
            exiting={SlideOutRight.duration(300)}
            layout={Layout.springify().delay(300)}>
            <Exercise item={item} />
          </Animated.View>
        )}
        ListHeaderComponent={() => (
          <BoxPressable onPress={openModal} width={80} alignItems="center">
            <Text
              preset="pLarge"
              bold
              color="contrast"
              textDecorationLine="underline"
              mb={14}>
              Filtros
            </Text>
          </BoxPressable>
        )}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
};

export default ExercisesList;
