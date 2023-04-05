import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native'
import { useTheme } from 'styled-components/native';
import { RootStackParamList } from '../../routes/Models';
import * as S from './styles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import ExerciseInWorkoutItem from '../../components/ExerciseInWorkoutItem';
import { WorkoutSeasonContext } from '../../contexts/WorkooutSeason';
import { FlashList } from '@shopify/flash-list';
import { ExercisesInWorkoutType } from '../../models/ExercisesInWorkoutType';
import { useTabBar } from '../../contexts/TabBarContext';
import { useRealm } from '../../contexts/RealmContext';
import { WorkoutType } from '../../models/WorkoutType';
import { SerieType } from '../../models/SerieType';
import { HistoricType } from '../../models/HistoricType';
import ChronometerButton from '../../components/ChronometerButton';
import { useFocusEffect } from '@react-navigation/native';

type Navigation = StackScreenProps<RootStackParamList, 'WorkoutSeason'>

const WorkoutSeason: React.FC<Navigation> = ({ navigation, route }) => {
    const theme = useTheme()
    const { workout } = route.params
    const { hideTabBar, showTabBar } = useTabBar()
    const { setWorkoutCopy, workoutCopy } = useContext(WorkoutSeasonContext)
    const { realm } = useRealm()

    useEffect(() => {
        startWorkout(workout)
        return showTabBar
    }, [])

    useFocusEffect(useCallback(() => hideTabBar(), []))

    const handleFineshWorkout = useCallback(() => {

        return new Promise<{
            isFinished: boolean;
            workoutCopy: WorkoutType | undefined;
        }>((resolve, reject) => {
            Alert.alert(
                'Terminar treino',
                'Tem certeza que quer terminar o treino?',
                [{
                    text: 'Sim',
                    onPress: () => {
                        setWorkoutCopy(undefined)
                        navigation.navigate('Home')
                        const returnData = { isFinished: true, workoutCopy: workoutCopy }
                        resolve(returnData)
                    }
                },
                {
                    text: 'Não',
                    style: 'cancel'
                }])
        })
    }, [])
    const createSerie = useCallback((currentExercise: ExercisesInWorkoutType) => {
        setWorkoutCopy(old => {
            if (old) {
                const index = old.exercises.findIndex((v) => v.exercise_id == currentExercise.exercise_id)
                old.exercises[index].series.push({
                    rep: 8,
                    rest: 30,
                    serie: old.exercises[index].series.length + 1
                })
                return { ...old, exercises: [...old.exercises] }
            }
        })
    }, [])
    const markSerieAsDone = useCallback((currentExercise: ExercisesInWorkoutType, serieNumber: number) => {
        let isDone = false

        setWorkoutCopy(old => {
            if (old) {
                const exerciseIndex = old.exercises.indexOf(currentExercise)
                const serieIndex = serieNumber - 1
                old.exercises[exerciseIndex].series[serieIndex].done = !old.exercises[exerciseIndex].series[serieIndex].done

                isDone = !old.exercises[exerciseIndex].series[serieIndex].done
                return { ...old }
            }
        })

        return isDone
    }, [])


    const cancelWorkout = useCallback(() => {
        setWorkoutCopy(undefined)
    }, [])

    const startWorkout = useCallback((workout: WorkoutType) => {
        if (!workoutCopy) {
            workout.exercises.forEach(exercise => {
                exercise.series.forEach(serie => serie.done = false)
            })
            setWorkoutCopy(workout)
        }
    }, [])

    const deleteSerie = useCallback((currentExercise: ExercisesInWorkoutType, serieNumber: number) => {
        setWorkoutCopy(old => {
            if (old) {

                const exericseIndex = old.exercises.findIndex((v) => v.exercise_id == currentExercise.exercise_id)

                if (old.exercises[exericseIndex].series.length == 1) {
                    old.exercises.splice(exericseIndex, 1)
                    return { ...old }
                }


                old.exercises[exericseIndex].series.splice(serieNumber - 1, 1)

                old.exercises[exericseIndex].series.forEach(serie => {
                    if (Number(serie.serie) > serieNumber) serie.serie = Number(serie.serie) - 1
                })

                return { ...old, exercises: [...old.exercises] }
            }
        })
    }, [])

    const changeSerie = useCallback((currentExercise: ExercisesInWorkoutType, serieNumber: number, newSerie: SerieType) => {
        setWorkoutCopy(old => {
            if (old) {
                const exerciseIndex = old.exercises.findIndex((v) => v.exercise_id == currentExercise.exercise_id)
                old.exercises[exerciseIndex].series[serieNumber - 1] = newSerie
                return { ...old }
            }
        })
    }, [])

    const deleteExercise = useCallback((exercise: ExercisesInWorkoutType) => {
        setWorkoutCopy(old => {
            if (old) {
                let copy = old
                const index = copy.exercises.findIndex((v) => v.exercise_id == exercise.exercise_id)
                copy.exercises.splice(index, 1)

                return { ...copy, exercises: [...old.exercises] }
            }
        })
    }, [])



    return (
        <S.Container>
            <S.Header>
                <S.Left>
                    <S.GoBack onPressIn={() => navigation.navigate('Home')}>
                        <AntDesign name='arrowleft' size={theme.sizes.icons.md} color={theme.colors.contrast} />
                    </S.GoBack>
                    <S.Title numberOfLines={1}>{workoutCopy?.title}</S.Title>
                </S.Left>
                <S.CancelWorkoutBtn onPressIn={() => {
                    cancelWorkout()
                    navigation.goBack()
                }}>
                    <S.CancelWorkoutTxt>Cancelar</S.CancelWorkoutTxt>
                </S.CancelWorkoutBtn>
            </S.Header>

            {
                workoutCopy?.anotation && (
                    <S.AnotationContainer>
                        <S.Anotation>{workoutCopy?.anotation}</S.Anotation>
                    </S.AnotationContainer>
                )
            }

            <FlashList
                data={workoutCopy?.exercises}
                extraData={workoutCopy?.exercises}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled
                estimatedItemSize={10}
                renderItem={({ item }) => (
                    <ExerciseInWorkoutItem
                        item={item}
                        showRest={false}
                        showCreateSerie={true}
                        showDeleteSerieButton={true}
                        createSerieFunction={createSerie}
                        deleteSerieFunction={deleteSerie}
                        showSucessButton={true}
                        sucessButtonFunction={markSerieAsDone}
                        deleteExerciseFuntion={deleteExercise}
                        changeSerie={changeSerie}
                        showDeleteExerciseBtn={true}
                    />
                )}
            />
            <ChronometerButton handleFineshWorkout={handleFineshWorkout} />
        </S.Container >
    )
}

export default WorkoutSeason;