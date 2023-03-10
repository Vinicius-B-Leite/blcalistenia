import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useState, useEffect, useLayoutEffect } from 'react';
import { FlatList, Alert } from 'react-native'
import { useTheme } from 'styled-components/native';
import { RootStackParamList } from '../../routes/Models';
import * as S from './styles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import ExerciseInWorkoutItem from '../../components/ExerciseInWorkoutItem';
import { WorkoutSeasonContext } from '../../contexts/WorkooutSeason';
import { useTimer } from '../../hooks/useTimer';

type Navigation = StackScreenProps<RootStackParamList, 'WorkoutSeason'>

const WorkoutSeason: React.FC<Navigation> = ({ navigation, route }) => {
    const theme = useTheme()
    const { workout } = route.params
    const { finishWorkout, startWorkout, createSerie, deleteSerie, markSerieAsDone, deleteExercise, cancelWorkout, timer } = useContext(WorkoutSeasonContext)

    useEffect(() => {
        startWorkout(workout)

    }, [])

    const handleFineshWorkout = () => {
        Alert.alert(
            'Terminar treino',
            'Tem certeza que quer terminar o treino?',
            [{
                text: 'Sim',
                onPress: () => {
                    finishWorkout(timer).then(() => navigation.navigate('Home'))
                }
            },
            {
                text: 'Não',
                style: 'cancel'
            }])
    }


    return (
        <S.Container>
            <S.Header>
                <S.Left>
                    <S.GoBack onPress={() => navigation.navigate('Home')}>
                        <AntDesign name='arrowleft' size={theme.sizes.icons.md} color={theme.colors.contrast} />
                    </S.GoBack>
                    <S.Title numberOfLines={1}>{workout.title}</S.Title>
                </S.Left>
                <S.CancelWorkoutBtn onPress={() => navigation.goBack()}>
                    <S.CancelWorkoutTxt>Cancelar</S.CancelWorkoutTxt>
                </S.CancelWorkoutBtn>
            </S.Header>

            {
                workout.anotation && (
                    <S.AnotationContainer>
                        <S.Anotation>{workout.anotation}</S.Anotation>
                    </S.AnotationContainer>
                )
            }

            <FlatList
                data={workout.exercises}
                extraData={workout.exercises}
                removeClippedSubviews={false}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <ExerciseInWorkoutItem
                        item={item}
                        showRest={false}
                        showCreateSerie={true}
                        showDeleteSerieButton={true}
                        createSerieFunction={(exercise) => createSerie(exercise)}
                        deleteSerieFunction={(exercise, serieNumber) => deleteSerie(exercise, serieNumber)}
                        showSucessButton={true}
                        sucessButtonFunction={(exercise, serieNumber) => markSerieAsDone(exercise, serieNumber)}
                        deleteExerciseFuntion={(exercise) => deleteExercise(exercise)}
                    />
                )}
            />

            <S.finishWorkout onPress={() => handleFineshWorkout()}>
                <S.FineshText>Terminar treino {String(Math.floor(timer / 60)).padStart(2, '0')}:{String(timer % 60).padStart(2, '0')}</S.FineshText>
            </S.finishWorkout>
        </S.Container >
    )
}

export default WorkoutSeason;