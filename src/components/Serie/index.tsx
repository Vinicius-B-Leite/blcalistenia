import React, { memo, useState } from 'react';
import { ExercisesInWorkoutType } from '../../models/ExercisesInWorkoutType';
import * as S from './styles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/Models';
import { SerieType } from '../../models/SerieType';
import { useDispatch, useSelector } from 'react-redux'
import { removeSerie, updateSerie } from '../../features/Workout/workoutSlicer'
import { RootState } from '../../store';


type NavigationType = StackNavigationProp<RootStackParamList, 'Workout'>
type Props = {
    item: SerieType,
    exercise: ExercisesInWorkoutType,
    deleteSerieButton?: boolean,
}
const Serie: React.FC<Props> = ({ item, deleteSerieButton, exercise }) => {
    const theme = useTheme()
    const navigation = useNavigation<NavigationType>()

    const dispatch = useDispatch()
    const showSucessButton = useSelector((state: RootState) => state.workout.isWorkingout)

    const [rep, setRep] = useState(item?.rep)
    const [rest, setRest] = useState(item?.rest)
    const [done, setDone] = useState(item?.done || false)

    const newSerie: SerieType = { rep, rest, done, serie: item.serie }

    dispatch(updateSerie({ exercise_id: exercise.exercise_id as string, newSerie, serieNumber: item.serie as number }))

    return (
        <S.Container>
            {
                deleteSerieButton && (
                    <S.DeleteSerieButton onPressIn={() => dispatch(removeSerie({ exercise_id: exercise.exercise_id as string, serieNumber: item.serie as number }))}>
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
                onChangeText={txt => setRep(Number(txt))}
            />

            {

                !showSucessButton && <S.SerieInfo
                    value={String(rest)}
                    onChangeText={txt => setRest(Number(txt))}
                />
            }

            {
                showSucessButton && (
                    <S.CheckButton
                        selected={done}
                        onPressIn={() => {
                            dispatch(updateSerie({ exercise_id: exercise.exercise_id as string, newSerie: { ...item, done: !done }, serieNumber: item.serie as number }))
                            setDone(!done)
                            navigation.navigate('Rest', { totalSeconds: item.rest })

                        }}>
                        <AntDesign name='check' color={theme.colors.text} />
                    </S.CheckButton>
                )
            }
        </S.Container >)
}

export default memo(Serie, (prev, nxt) => (prev.item.serie === nxt.item.serie));