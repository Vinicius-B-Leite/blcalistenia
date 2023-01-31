import React, { useContext, useState } from 'react';
import { WorkoutContext } from '../../contexts/WorkoutContext';
import { exercisesInWorkout } from '../../models/exercisesInWorkout';
import { series } from '../../models/workout';
import * as S from './styles'



type Props = {
    item: series,
    exercise: exercisesInWorkout,
    enableChanges: boolean
}
const Serie: React.FC<Props> = ({ item, exercise, enableChanges }) => {
    const [rep, setRep] = useState(item.rep)
    const [rest, setRest] = useState(item.rest)
    const { deleteSerie, updateSerie } = useContext(WorkoutContext)

    const handleChange = (text: Number, state: 'rep' | 'rest') => {
        if (state == 'rep') setRep(text)
        if (state == 'rest') setRest(text)

        updateSerie(item.serie as number, exercise, {
            rep: state == 'rep' ? text : rep,
            rest: state == 'rest' ? text : rest,
            serie: item.serie
        })
    }
    return (
        <S.Container>
            {
                enableChanges && (
                    <S.DeleteSerieButton onPress={() => deleteSerie(exercise, item.serie)}>
                        <S.DeleteSerieText />
                    </S.DeleteSerieButton>
                )
            }

            <S.SerieInfo
                editable={false}
                defaultValue={String(item.serie)}
            />
            <S.SerieInfo
                value={String(rep)}
                onChangeText={(text) => handleChange(Number(text), 'rep')}
            />

            <S.SerieInfo
                value={String(rest)}
                onChangeText={(text) => handleChange(Number(text), 'rest')}
            />
        </S.Container>)
}

export default Serie;