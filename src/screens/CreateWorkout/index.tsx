import React, { useState, useContext, useEffect, useMemo, useCallback } from 'react';
import { Alert, FlatList } from 'react-native';
import { FlashList } from '@shopify/flash-list'
import * as S from './styles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { useTheme } from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/Models';
import ExerciseInWorkoutItem from '../../components/ExerciseInWorkoutItem';
import { WorkoutContext } from '../../contexts/WorkoutContext';
import { pickeImage } from '../../utils/pickImage';
import uuid from 'react-native-uuid';
import { useTabBar } from '../../contexts/TabBarContext';
import { WorkoutType } from '../../models/WorkoutType';
import { isEqual } from 'lodash'
import { useRealm } from '../../contexts/RealmContext';
import { ExercisesInWorkoutType } from '../../models/ExercisesInWorkoutType';
import { SerieType } from '../../models/SerieType';
import { createContext, useContextSelector } from 'use-context-selector';
import { useFocusEffect } from '@react-navigation/native';




type Navigation = StackScreenProps<RootStackParamList, 'CreateWorkout'>

const CreateWorkout: React.FC<Navigation> = ({ route, navigation }) => {
    const theme = useTheme()
    const { showTabBar, hideTabBar } = useTabBar()
    const {
        deleteWorkout,
        exercises,
        setExercises,
    } = useContext(WorkoutContext)
    const [workoutName, setWorkoutName] = useState(route?.params?.workout?.title as string || '')
    const [anotation, setAnotation] = useState(route?.params?.workout?.anotation as string || '')
    const [imageURI, setImageURI] = useState(route?.params?.workout?.banner as string || '')
    const workout_id = useMemo(() => route?.params?.workout?._id as string || uuid.v4().toString(), [])
    const { realm } = useRealm()
    const [initialState, _] = useState({
        _id: route?.params?.workout?._id as string || uuid.v4().toString(),
        banner: route?.params?.workout?.banner as string || '',
        exercises: exercises || [],
        title: route?.params?.workout?.title as string || '',
        anotation: route?.params?.workout?.anotation as string || ''
    })

    const saveWorkout = useCallback(({ banner, exercises, title, anotation, _id }: WorkoutType) => {
        realm && realm.write(() => {
            realm.create<WorkoutType>('Workout', {
                _id: _id,
                anotation: anotation,
                banner: banner,
                exercises: exercises,
                title: title
            }, Realm.UpdateMode.Modified).toJSON() as WorkoutType
        })
    }, [realm])
    const createSerie = useCallback((exercise: ExercisesInWorkoutType) => {

        setExercises(old => {
            const index = old.indexOf(exercise)
            old[index].series.push({
                rep: 8,
                rest: 30,
                serie: old[index].series.length + 1
            })
            return [...old]
        })

    }, [])
    const updateSerie = useCallback((serieNumber: number, exercise: ExercisesInWorkoutType, newSerie: SerieType) => {
        setExercises(old => {
            const exerciseIndex = old.findIndex((v) => v.exercise_id == exercise.exercise_id)
            const serieIndex = old[exerciseIndex].series.findIndex((v) => v.serie == serieNumber)
            let copyExercise = [...old]

            copyExercise[exerciseIndex].series[serieIndex] = newSerie
            return [...copyExercise]
        })
    }, [])
    const deleteSerie = useCallback((exercise: ExercisesInWorkoutType, serie: Number) => {

        setExercises(old => {
            const indexExercise = old.indexOf(exercise)
            let seriesIndex = old[indexExercise].series.findIndex((v) => v.serie == serie)

            if (old[indexExercise].series.length == 1) {
                old.splice(indexExercise, 1)
            } else {
                old[indexExercise].series.forEach(s => {
                    if (old[indexExercise].series.findIndex(v => v.serie == s.serie) > seriesIndex) {
                        s.serie = Number(s.serie) - 1
                    }
                })

                old[indexExercise].series.splice(seriesIndex, 1)

            }
            return [...old]
        })
    }, [])
    const deleteExercise = useCallback((exercise: ExercisesInWorkoutType) => {
        setExercises(old => {
            let copy = [...old]
            const index = copy.indexOf(exercise)
            copy.splice(index, 1)
            return copy
        })
    }, [])

    useEffect(() => {
        saveWorkout({
            banner: imageURI,
            exercises: exercises,
            title: workoutName || 'Desconhecido',
            anotation: anotation,
            _id: route?.params?.workout?._id || workout_id
        })

    }, [workoutName, anotation, imageURI, exercises])

    useEffect(() => {
        setExercises(route?.params?.workout?.exercises || [])
        const sub = navigation.addListener('beforeRemove', async (e) => {
            e.preventDefault()
            await handleGoBack()
            showTabBar()
            navigation.dispatch(e.data.action)
        })

        return sub
    }, [])

    useFocusEffect(useCallback(() => {
        hideTabBar()

        return showTabBar
    }, []))

    const handleGoBack = useCallback(async () => {
        return new Promise<void>((resolve, reject) => {

            Alert.alert(
                'Atenção',
                'Deseja salvar as alterações?',
                [
                    {
                        text: 'Não',
                        style: 'cancel',
                        onPress: () => {
                            if (!(route?.params?.workout)) deleteWorkout(workout_id)
                            else {
                                if (initialState) saveWorkout({ ...initialState })
                            }
                            resolve()
                        }
                    },
                    {
                        text: 'Sim',
                        onPress: () => {
                            resolve()
                        }
                    }
                ]
            )
        })
    }, [])

    const handleImagePicker = useCallback(async () => {
        const { assets } = await pickeImage()
        const uri = assets ? assets[0].uri : ''
        const finalUri = uri ? uri : ''

        setImageURI(finalUri)
    }, [])

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
                <S.ImagePickerButton onPressIn={handleImagePicker}>
                    <Feather name='image' size={theme.sizes.icons.sm} color={theme.colors.contrast} />
                </S.ImagePickerButton>
            </S.Header>


            <S.AnotationContainer>
                <S.Anotation
                    value={anotation}
                    onChangeText={setAnotation}
                    placeholder='Anotação'
                    placeholderTextColor={theme.colors.darkText}
                />
            </S.AnotationContainer>
            <FlashList
                estimatedItemSize={10}
                data={exercises}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled
                renderItem={({ item }) => (
                    <ExerciseInWorkoutItem
                        item={item}
                        showRest={true}
                        showCreateSerie={true}
                        showDeleteSerieButton={true}
                        showSucessButton={false}
                        createSerieFunction={createSerie}
                        deleteSerieFunction={deleteSerie}
                        deleteExerciseFuntion={deleteExercise}
                        updateSerie={updateSerie}
                        showDeleteExerciseBtn={true}
                    />
                )}
                ListFooterComponent={() => (
                    <S.AddExerciseButton onPressIn={() => navigation.navigate('AddExercise')}>
                        <S.AddExerciseText>Adiconar exercício</S.AddExerciseText>
                    </S.AddExerciseButton>
                )}
            />
            {
                route?.params?.workout && (
                    <S.StartWorkout onPressIn={() => navigation.navigate('WorkoutSeason', { workout: { _id: workout_id, banner: imageURI, exercises: exercises, title: workoutName, anotation: anotation } })}>
                        <S.StartText>Iniciar treino</S.StartText>
                    </S.StartWorkout>
                )
            }
        </S.Container>

    )
}

export default CreateWorkout;