import React, { useEffect, useRef, useState } from 'react';
import * as S from './styles'
import { Alert } from 'react-native'
import Header from './components/Header';
import { useTheme } from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/Models';
import { RootState } from '../../features/store';
import { useDispatch, useSelector } from 'react-redux'
import { setWorkout } from '../../features/Workout/workoutSlicer'
import WorkoutList from './components/ExerciseList'
import ChronometerButton from '../../components/ChronometerButton';
import { useUser } from '@realm/react';
import uuid from 'react-native-uuid'
import { WorkoutType } from '../../models/WorkoutType';

type Navigation = StackScreenProps<RootStackParamList, 'Workout'>

const Workout: React.FC<Navigation> = ({ route }) => {
    const theme = useTheme()

    const user = useUser()

    const dispatch = useDispatch()
    const isTrainig = useSelector((state: RootState) => state.workout?.isWorkingout)
    const workout = useSelector((state: RootState) => state.workout?.workout)

    const isTrainigRef = useRef(isTrainig)
    isTrainigRef.current = isTrainig

    useEffect(() => {
        if (route.params.workout?._id) {
            dispatch(setWorkout({ ...route.params.workout }))
        } else {
            if (!isTrainig) {
                console.log('Entrou')
                const _id = uuid.v4().toString()

                dispatch(setWorkout({
                    ...workout,
                    user_id: user.id,
                    _id
                }))
            }
        }

        return () => {
            if (!isTrainigRef.current) {
                dispatch(setWorkout({} as WorkoutType))
            }
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