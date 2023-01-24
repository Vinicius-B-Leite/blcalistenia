import { useTheme } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { ExerciseContext } from '../../contexts/ExerciseContext';
import { WorkoutContext } from '../../contexts/WorkoutContext';
import { exercisesInWorkout } from '../../models/exercisesInWorkout';
import { series } from '../../models/workout';
import * as S from './styles'



type Props = {
    item: series,
    exercise: exercisesInWorkout
}
const Serie: React.FC<Props> = ({ item, exercise }) => {
    const theme = useTheme()
    const [rep, setRep] = useState(item.rep)
    const { deleteSerie } = useContext(WorkoutContext)
    const [rest, setRest] = useState(item.rest)

    const handleChange = () => {
    }
    return (
        <S.Container>
            <S.DeleteSerieButton onPress={() => deleteSerie(exercise, item.serie)}>
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