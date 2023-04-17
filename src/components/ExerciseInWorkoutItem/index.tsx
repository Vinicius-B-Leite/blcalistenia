import React, { memo } from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from 'styled-components/native';
import { ExercisesInWorkoutType } from '../../models/ExercisesInWorkoutType';
import * as S from './styles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Serie from '../Serie';
import { useDispatch, useSelector } from 'react-redux'
import { removeExercise, addSerie } from '../../features/Workout/workoutSlicer'
import { RootState } from '../../store';
import { FlashList } from '@shopify/flash-list';

type Props = {
    item: ExercisesInWorkoutType,
    showCreateSerie?: boolean,
    showDeleteSerieButton?: boolean,
    showDeleteExerciseBtn?: boolean,
}

const ExerciseInWorkoutItem: React.FC<Props> = ({ item, showCreateSerie, showDeleteSerieButton, showDeleteExerciseBtn }) => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const isWorkingout = useSelector((state: RootState) => state.workout.isWorkingout)




    return (
        <S.Exercise>
            <S.ExerciseHeader>
                <S.ExerciseName>{item.exercise_id}</S.ExerciseName>
                {showDeleteExerciseBtn && (<TouchableOpacity onPressIn={() => dispatch(removeExercise(item))}>
                    <FontAwesome name='trash' size={theme.sizes.icons.sm} color={theme.colors.alert} />
                </TouchableOpacity>)}
            </S.ExerciseHeader>
            <S.ExerciseAnotation
                placeholder='Anotação'
                placeholderTextColor={theme.colors.darkText}
            />
            <S.Row>
                <S.Title>Série</S.Title>
                <S.Title>Repetições</S.Title>
                {!isWorkingout && <S.Title>Descanso(s)</S.Title>}
                {isWorkingout && <S.Title>Concluída</S.Title>}
            </S.Row>
            <FlashList
                estimatedItemSize={10}
                data={item.series}
                extraData={item.series}
                nestedScrollEnabled
                renderItem={({ item: serie }) => (
                    <Serie
                        item={serie}
                        exercise={item}
                        deleteSerieButton={showDeleteSerieButton}
                    />
                )}
                ListFooterComponent={() => showCreateSerie ? (
                    <S.CreateNewSerieButton onPress={() => dispatch(addSerie(item))}>
                        <S.CreateNewSerieText>+</S.CreateNewSerieText>
                    </S.CreateNewSerieButton>
                ) : <></>}
            />
        </S.Exercise>
    )
}

export default memo(ExerciseInWorkoutItem)