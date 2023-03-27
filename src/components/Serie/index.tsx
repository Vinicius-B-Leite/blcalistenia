import React, { useContext, useState } from 'react';
import { WorkoutSeasonContext } from '../../contexts/WorkooutSeason';
import { WorkoutContext } from '../../contexts/WorkoutContext';
import { ExercisesInWorkoutType } from '../../models/ExercisesInWorkoutType';
import * as S from './styles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/Models';
import { SerieType } from '../../models/SerieType';

type NavigationType = StackNavigationProp<RootStackParamList, 'WorkoutSeason'>
type Props = {
    item: SerieType,
    exercise: ExercisesInWorkoutType,
    showRest: boolean,
    showSucessButton: boolean
    deleteSerieButton: boolean,
    deleteSerie: (exercise: ExercisesInWorkoutType, serie: number) => void,
    sucessButton: (exercise: ExercisesInWorkoutType, serieNumber: number) => void,
}
const Serie: React.FC<Props> = ({ item, exercise, deleteSerieButton, showRest, sucessButton, deleteSerie, showSucessButton }) => {
    const theme = useTheme()
    const [rep, setRep] = useState(item.rep)
    const [rest, setRest] = useState(item.rest)
    const { updateSerie } = useContext(WorkoutContext)
    const { changeSerie } = useContext(WorkoutSeasonContext)
    const navigation = useNavigation<NavigationType>()

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

    const handleMarkAsDone = () => {
        if (item.done === false) navigation.navigate('Rest', { totalSeconds: item.rest})
        sucessButton(exercise, item.serie as number)
    }
    return (
        <S.Container>
            {
                deleteSerieButton && (
                    <S.DeleteSerieButton onPressIn={() => deleteSerie(exercise, Number(item.serie))}>
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
                    <S.CheckButton selected={item.done ? true : false} onPressIn={handleMarkAsDone}>
                        <AntDesign name='check' color={theme.colors.text} />
                    </S.CheckButton>
                )
            }
        </S.Container>)
}

export default Serie;