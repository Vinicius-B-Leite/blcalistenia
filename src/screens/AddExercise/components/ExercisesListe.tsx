import { FlashList } from '@shopify/flash-list';
import React, { useMemo } from 'react';
import * as S from './style'
import { useRealm } from '../../../services/realm/realm';
import { ExerciseType } from '../../../models/ExerciseType';
import Exercise from '../../../components/Exercise';
import { useSelector } from 'react-redux';
import { RootState } from '../../../features/store';
import Animated, { FadeInDown, Layout, SlideInRight, SlideOutRight } from 'react-native-reanimated';
import { initialsExercises } from '../../../utils/initialsExercises';

type Props = {
    openModal: () => void
}
const ExercisesList: React.FC<Props> = ({ openModal }) => {
    const realm = useRealm()

    const searchExerciseInput = useSelector((state: RootState) => state.exercise.searchInput)
    const exercisList = useSelector((state: RootState) => state.exercise.exercises)

    const exercisesSearched = useMemo(() => {
        const exercises = [...realm?.objects('Exercise').toJSON() as ExerciseType[], ...initialsExercises]

        return exercises?.filter(e => e.name.toLocaleLowerCase().includes(searchExerciseInput?.toLocaleLowerCase()))
    }, [searchExerciseInput])


    return (
        <S.Main>
            <S.ExerciseListContainer>
                <FlashList
                    estimatedItemSize={exercisList.length || exercisesSearched.length || 30}
                    data={searchExerciseInput ? exercisesSearched : exercisList}
                    keyExtractor={item => String(item.name)}
                    renderItem={({ item }) => (
                        <Animated.View
                            exiting={SlideOutRight.duration(300)}
                            layout={Layout.springify().delay(300)}>
                            <Exercise item={item} />
                        </Animated.View >
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
    )
}

export default ExercisesList;