import React, { useEffect } from 'react';
import * as S from './styles'
import Header from './components/Header';
import { useTheme } from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/Models';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux'
import { setWorkout } from '../../features/Workout/workoutSlicer'
import WorkoutList from './components/ExerciseList'
import ChronometerButton from '../../components/ChronometerButton';

type Navigation = StackScreenProps<RootStackParamList, 'Workout'>

const Workout: React.FC<Navigation> = ({ route, navigation }) => {
    const theme = useTheme()

    const dispatch = useDispatch()

    const workout = useSelector((state: RootState) => state.workout?.workout)

    useEffect(() => {
        if (route.params.workout) {
            dispatch(setWorkout({ ...route.params.workout }))
        }
    }, [])


    return (
        <S.Container>

            <Header />

            <S.AnotationContainer>
                <S.Anotation
                    value={workout?.anotation}
                    onChangeText={txt => dispatch(setWorkout({ ...workout, anotation: txt }))}
                    placeholder='Anotação'
                    placeholderTextColor={theme.colors.darkText}
                />
            </S.AnotationContainer>

            <WorkoutList />
            <ChronometerButton />

        </S.Container>

    )
}

export default Workout;