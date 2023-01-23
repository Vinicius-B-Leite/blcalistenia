import { useTheme } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { ExerciseContext } from '../../contexts/ExerciseContext';
import { ExerciseInWorkoutContext } from '../../contexts/ExercisesInWorkout';
import { exercisesInWorkout } from '../../models/exercisesInWorkout';
import { series } from '../../models/workout';
import * as S from './styles'



type Props = {
    item: series,
    exercise: exercisesInWorkout
}
const Serie: React.FC<Props> = ({ item, exercise }) => {
    const { updateSeries, deleteSerie } = useContext(ExerciseInWorkoutContext)
    const theme = useTheme()
    const [rep, setRep] = useState(item.rep)
    const [rest, setRest] = useState(item.rest)

    const handleChange = () => {
        updateSeries(exercise, item.serie, rep, rest)
    }
    return (
        <S.Container>
            <S.DeleteSerieButton onPress={() => deleteSerie(item.serie, exercise.exercise_id)}>
                <S.DeleteSerieText />
            </S.DeleteSerieButton>
            <S.SerieInfo
                editable={false}
                defaultValue={String(item.serie)}
            />
            <S.SerieInfo
                value={String(rep)}
                onChangeText={(text) => setRep(Number(text))}
                onEndEditing={(e) => handleChange()}

            />

            <S.SerieInfo
                value={String(rest)}
                onChangeText={(text) => setRest(Number(text))}
                onEndEditing={(e) => handleChange()}

            />
        </S.Container>)
}

export default Serie;