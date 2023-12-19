import {FlashList} from '@shopify/flash-list';
import React, {useMemo} from 'react';
import * as S from './style';
import {ExerciseType} from '../../../models/ExerciseType';
import Exercise from '../../../components/Exercise';
import {useSelector} from 'react-redux';
import {RootState} from '../../../features/store';
import Animated, {
  FadeInDown,
  Layout,
  SlideInRight,
  SlideOutRight,
} from 'react-native-reanimated';
import {useExerciseList} from '../hooks/useExerciseList';

type Props = {
  openModal: () => void;
};
const ExercisesList: React.FC<Props> = ({openModal}) => {
  const {exercisList, exercisesSearched, searchExerciseInput} =
    useExerciseList();

  return (
    <S.Main>
      <S.ExerciseListContainer>
        <FlashList
          estimatedItemSize={30}
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
            <S.FilterButton onPress={openModal}>
              <S.FilterText>Filtros</S.FilterText>
            </S.FilterButton>
          )}
          showsVerticalScrollIndicator={false}
        />
      </S.ExerciseListContainer>
    </S.Main>
  );
};

export default ExercisesList;
