import React, { useContext, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { WorkoutSeasonContext } from '../../contexts/WorkooutSeason';
import { WorkoutContext } from '../../contexts/WorkoutContext';
import { exercisesInWorkout } from '../../models/exercisesInWorkout';
import { series } from '../../models/workout';
import { Text } from '../Workout/styles';
import * as S from './styles'
import AntDesign from 'react-native-vector-icons/AntDesign'


type Props = {
    item: series,
    exercise: exercisesInWorkout,
    deleteSerieButton: boolean,
    deleteSerie: (exercise: exercisesInWorkout, serie: number) => void,
    showRest: boolean,
    sucessButton: (exercise: exercisesInWorkout, serieNumber: number) => void,
    showSucessButton: boolean
}
const Serie: React.FC<Props> = ({ item, exercise, deleteSerieButton, showRest, sucessButton, deleteSerie, showSucessButton }) => {
    const [rep, setRep] = useState(item.rep)
    const [rest, setRest] = useState(item.rest)
    const { updateSerie } = useContext(WorkoutContext)
    const { changeSerie } = useContext(WorkoutSeasonContext)

    const handleChange = (text: Number, state: 'rep' | 'rest') => {
        if (state == 'rep') setRep(text)
        if (state == 'rest') setRest(text)

        if (showRest == true) {
            updateSerie(item.serie as number, exercise, {
                rep: state == 'rep' ? text : rep,
                rest: state == 'rest' ? text : rest,
                serie: item.serie
            })
        } else {
            changeSerie(exercise, item.serie as number, {
                rep: state == 'rep' ? text : rep,
                rest: state == 'rest' ? text : rest,
                serie: item.serie
            })
        }
    }
    return (
        <S.Container>
            {
                deleteSerieButton && (
                    <S.DeleteSerieButton onPress={() => deleteSerie(exercise, Number(item.serie))}>
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

            {
                
                showRest && <S.SerieInfo
                    value={String(rest)}
                    onChangeText={(text) => handleChange(Number(text), 'rest')}
                />
            }

            {
                showSucessButton && (
                    <S.CheckButton selected={item.done ? true : false} onPress={() => sucessButton(exercise, item.serie as number)}>
                        <AntDesign name='check' color={'#fff'} />
                    </S.CheckButton>
                )
            }
        </S.Container>)
}

export default Serie;