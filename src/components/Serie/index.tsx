import React, { useContext, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { WorkoutSeasonContext } from '../../contexts/WorkooutSeason';
import { WorkoutContext } from '../../contexts/WorkoutContext';
import { ExercisesInWorkoutType } from '../../models/ExercisesInWorkoutType';
import { Text } from '../Workout/styles';
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
        sucessButton(exercise, item.serie as number)
        if (item.done === true) navigation.navigate('Rest', { totalSeconds: item.rest})
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
                    <S.CheckButton selected={item.done ? true : false} onPress={handleMarkAsDone}>
                        <AntDesign name='check' color={theme.colors.text} />
                    </S.CheckButton>
                )
            }
        </S.Container>)
}

export default Serie;