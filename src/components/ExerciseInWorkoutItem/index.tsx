import React from 'react';
import { FlatList } from 'react-native';
import { useTheme } from 'styled-components/native';
import { exercisesInWorkout } from '../../models/exercisesInWorkout';
import * as S from './styles'
import Entypo from 'react-native-vector-icons/Entypo'



type Props = {
    item: exercisesInWorkout
}

const ExerciseInWorkoutItem: React.FC<Props> = ({ item }) => {
    const theme = useTheme()

    return (
        <S.Exercise>
            <S.ExerciseHeader>
                <S.ExerciseName>{item.exercise_id}</S.ExerciseName>
                <Entypo name='dots-three-vertical' size={theme.sizes.icons.sm} color={theme.colors.text}/>
            </S.ExerciseHeader>
            <S.ExerciseAnotation
                placeholder='Anotação'
                placeholderTextColor={theme.colors.darkText}
            />
            <FlatList
                data={item.series}
                ListHeaderComponent={() => (
                    <S.Row>
                        <S.Title>Série</S.Title>
                        <S.Title>Rep</S.Title>
                        <S.Title>Descanso</S.Title>
                    </S.Row>
                )}
                renderItem={({ item: serie }) => (
                    <S.Row>
                        <S.SerieInfo>{String(serie.serie)}</S.SerieInfo>
                        <S.SerieInfo>{String(serie.rep)}</S.SerieInfo>
                        <S.SerieInfo>{String(serie.rest)}</S.SerieInfo>
                    </S.Row>
                )}
            />
        </S.Exercise>
    )
}

export default ExerciseInWorkoutItem;