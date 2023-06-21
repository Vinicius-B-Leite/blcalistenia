import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Alert, FlatList } from 'react-native';
import * as S from './styles'
import Header from './components/Header';
import { useTheme } from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/Models';
import ExerciseInWorkoutItem from '../../components/ExerciseInWorkoutItem';
import { pickeImage } from '../../utils/pickImage';
import uuid from 'react-native-uuid';
import { WorkoutType } from '../../models/WorkoutType';
import { useRealm } from '../../contexts/RealmContext';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux'
import { addExercise, resetTimer, reseteExercises, setWorkout, updateTimer } from '../../features/Workout/workoutSlicer'
import ChronometerButton from '../../components/ChronometerButton';
import BackgroundService from 'react-native-background-actions'
import { options, sleep } from '../../utils/backgroundActionsConfig';
import { HistoricType } from '../../models/HistoricType';
import { FlashList } from '@shopify/flash-list';
import { addWorkout } from '../../features/WorkoutList/workoutListSlicer';

type Navigation = StackScreenProps<RootStackParamList, 'Workout'>

const Workout: React.FC<Navigation> = ({ route, navigation }) => {
    const theme = useTheme()

    const dispatch = useDispatch()

    const workout = useSelector((state: RootState) => state.workout?.workout)

    useEffect(() => {
        if (route.params.workout) {
            console.log("🚀 ~ file: index.tsx:34 ~ useEffect ~ route.params.workout:", route.params.workout)

            dispatch(setWorkout({ ...route.params.workout }))
        }
        // return () => {
        //     dispatch(reseteExercises())
        // }
    }, [])



    if (!workout) {
        return <></>
    }


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

            <S.ExercisesContainer>
                <FlashList
                    data={workout.exercises}
                    extraData={workout.exercises}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled
                    estimatedItemSize={workout?.exercises?.length || 10}
                    renderItem={({ item }) => (
                        <ExerciseInWorkoutItem
                            item={item}
                            showCreateSerie={true}
                            showDeleteSerieButton={true}
                            showDeleteExerciseBtn={true}
                        />
                    )}
                    ListFooterComponent={() => (
                        <S.AddExerciseButton onPress={() => navigation.navigate('AddExercise')}>
                            <S.AddExerciseText>Adiconar exercício</S.AddExerciseText>
                        </S.AddExerciseButton>
                    )}
                />
            </S.ExercisesContainer>
            <ChronometerButton />

        </S.Container>

    )
}

export default Workout;