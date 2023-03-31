import React, { memo, useContext, useState, useCallback } from 'react';
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
import { createContext, useContextSelector } from 'use-context-selector';



type NavigationType = StackNavigationProp<RootStackParamList, 'WorkoutSeason'>
type Props = {
    item: SerieType,
    exercise: ExercisesInWorkoutType,
    showRest: boolean,
    showSucessButton: boolean
    deleteSerieButton: boolean,
    deleteSerie: (exercise: ExercisesInWorkoutType, serie: number) => void,
    sucessButton: (serieNumber: number) => boolean,
    updateSerie?: (serieNumber: number, exercise: ExercisesInWorkoutType, newSerie: SerieType) => void,
    changeSerie?: (currentExercise: ExercisesInWorkoutType, serieNumber: number, newSerie: SerieType) => void
}
const Serie: React.FC<Props> = ({ item, exercise, deleteSerieButton, showRest, sucessButton, deleteSerie, showSucessButton, changeSerie, updateSerie }) => {
    const theme = useTheme()
    const [rep, setRep] = useState(item?.rep)
    const [rest, setRest] = useState(item?.rest)
    const navigation = useNavigation<NavigationType>()
    const [done, setDone] = useState(false)

    const handleChange = (text: Number, state: 'rep' | 'rest') => {
        if (state == 'rep') setRep(text)
        if (state == 'rest') setRest(text)

        if (showRest == true && updateSerie) {
            updateSerie(item.serie as number, exercise, {
                rep: state == 'rep' ? text : rep,
                rest: state == 'rest' ? text : rest,
                serie: item.serie
            })
        } else {
            changeSerie && changeSerie(exercise, item.serie as number, {
                rep: state == 'rep' ? text : rep,
                rest: state == 'rest' ? text : rest,
                serie: item.serie
            })
        }
    }

    console.log(exercise.exercise_id + ' / ' + item.serie + '   - render');
    
    const handleMarkAsDone = () => {
        setDone(!item.done)
        let isDone = sucessButton(item.serie as number)
        if (isDone === false) navigation.navigate('Rest', { totalSeconds: item.rest })
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
                    <S.CheckButton selected={done} onPressIn={handleMarkAsDone}>
                        <AntDesign name='check' color={theme.colors.text} />
                    </S.CheckButton>
                )
            }
        </S.Container>)
}

export default memo(Serie, (prev, nxt) => (prev.item.serie === nxt.item.serie));