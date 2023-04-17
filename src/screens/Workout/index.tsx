import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Alert, FlatList } from 'react-native';
import * as S from './styles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
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
import { addExercise, resetTimer, reseteExercises, setWorkoutCopy, updateTimer } from '../../features/Workout/workoutSlicer'
import ChronometerButton from '../../components/ChronometerButton';
import BackgroundService from 'react-native-background-actions'
import { options, sleep } from '../../utils/backgroundActionsConfig';
import { HistoricType } from '../../models/HistoricType';
import { FlashList } from '@shopify/flash-list';
import { addWorkout } from '../../features/WorkoutList/workoutListSlicer';

type Navigation = StackScreenProps<RootStackParamList, 'Workout'>

const Workout: React.FC<Navigation> = ({ route, navigation }) => {
    const theme = useTheme()
    const { realm } = useRealm()

    const dispatch = useDispatch()
    const isWorkingout = useSelector((state: RootState) => state.workout.isWorkingout)

    const workoutID = useMemo(() => route.params.workout?._id || uuid.v4().toString(), [route])

    const [workoutName, setWorkoutName] = useState(String(route.params.workout?.title || ''))
    const [anotation, setAnotation] = useState(String(route.params.workout?.anotation || ''))
    const exercises = useSelector((state: RootState) => state.workout.exercises)

    useEffect(() => {
        if (route.params.workout?.exercises) {
            dispatch(addExercise(route.params.workout?.exercises))
        }
        return () => {
            dispatch(reseteExercises())
        }
    }, [])

    const saveWorkout = () => {
        realm?.write(() => {
            const newWorkout = realm.create<WorkoutType>('Workout', {
                _id: workoutID,
                anotation,
                exercises,
                title: workoutName,
                banner: ''
            }, Realm.UpdateMode.Modified)
            dispatch(addWorkout(newWorkout.toJSON() as WorkoutType))
        })

        navigation.goBack()
    }

    const startWorkout = async () => {
        await BackgroundService.start(veryIntensiveTask, options)
        dispatch(setWorkoutCopy({ _id: workoutID, banner: '', exercises, title: workoutName, anotation }))
    }

    const veryIntensiveTask = async () => {

        await new Promise(async (resolve) => {
            for (let i = 0; BackgroundService.isRunning(); i++) {
                dispatch(updateTimer(i))
                BackgroundService.updateNotification({
                    taskDesc: `Tempo atual: ${String(Math.floor(i / 60)).padStart(2, '0')}:${String(i % 60).padStart(2, '0')}`
                })
                await sleep(1000);
            }
        });
    };

    const finishWorkout = useCallback((seconds: number, workoutCopy: WorkoutType) => {
        Alert.alert(
            'Encerrar o treino',
            'Você deseja encerrar o treino?',
            [
                {
                    text: 'Sim',
                    onPress: () => {
                        BackgroundService.stop().then(() => {
                            realm?.write(() => {
                                realm.create<HistoricType>('Historic', {
                                    workout: JSON.stringify(workoutCopy),
                                    date: new Date(),
                                    timerInSeconds: seconds,
                                    _id: realm.objects('Historic').length + 1
                                })
                                dispatch(resetTimer())
                                navigation.goBack()
                            })
                        })

                    }
                },
                {
                    text: 'Não',
                    style: 'cancel'
                }
            ]
        )
    }, [realm])

    const cancelWorkout = () => {
        Alert.alert(
            'Deseja cancelar o treino',
            'Você deseja cancelar o treino?',
            [
                {
                    text: 'Sim',
                    onPress: async () => {
                        dispatch(reseteExercises())
                        await BackgroundService.stop()
                        navigation.goBack()
                    }
                },
                {
                    text: 'Não',
                    style: 'cancel'
                }
            ]
        )
    }
    return (
        <S.Container>
            <S.Header>
                <S.Left>
                    <S.GoBack onPressIn={() => navigation.goBack()}>
                        <AntDesign name='arrowleft' size={theme.sizes.icons.md} color={theme.colors.contrast} />
                    </S.GoBack>
                    <S.Title
                        value={workoutName}
                        onChangeText={(txt) => setWorkoutName(txt)}
                        placeholder='Título do treino'
                        placeholderTextColor={theme.colors.darkContrast}
                    />
                </S.Left>
                {
                    isWorkingout ? (
                        <S.CancelWorkoutBtn onPress={cancelWorkout}>
                            <S.CancelWorkoutTxt>Cancelar</S.CancelWorkoutTxt>
                        </S.CancelWorkoutBtn>
                    ) : (
                        <S.ImagePickerButton onPressIn={saveWorkout}>
                            <Feather name='save' size={theme.sizes.icons.sm} color={theme.colors.contrast} />
                        </S.ImagePickerButton>

                    )
                }
            </S.Header>


            <S.AnotationContainer>
                <S.Anotation
                    value={anotation}
                    onChangeText={setAnotation}
                    placeholder='Anotação'
                    placeholderTextColor={theme.colors.darkText}
                />
            </S.AnotationContainer>

            <S.ExercisesContainer>
                <FlashList
                    data={exercises}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled
                    estimatedItemSize={10}
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
            <ChronometerButton
                startWorkout={startWorkout}
                finishWorkout={(seconds) => {
                    finishWorkout(seconds, {
                        _id: workoutID,
                        banner: '',
                        exercises: exercises,
                        title: workoutName,
                        anotation: anotation
                    })
                }} />

        </S.Container>

    )
}

export default Workout;