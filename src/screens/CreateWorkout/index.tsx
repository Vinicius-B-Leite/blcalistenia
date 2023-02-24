import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import { FlatList, View, Alert } from 'react-native';
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



type Navigation = StackScreenProps<RootStackParamList, 'CreateWorkout'>

const CreateWorkout: React.FC<Navigation> = ({ route, navigation }) => {
    const theme = useTheme()
    const {
        saveWorkout,
        deleteWorkout,
        exercises,
        createSerie,
        deleteSerie,
        setExercises,
        deleteExercise } = useContext(WorkoutContext)
    const [workoutName, setWorkoutName] = useState('')
    const [anotation, setAnotation] = useState('')
    const [imageURI, setImageURI] = useState('')
    const [workout_id, setWorkoutID] = useState(uuid.v4().toString())



    useLayoutEffect(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: {
                display: 'none'
            }
        })
        if (typeof route?.params?.workout !== 'undefined') {
            const { _id, banner, exercises, title, anotation } = route.params.workout
            setWorkoutName(title as string)
            setAnotation(anotation as string)
            setImageURI(banner)
            setWorkoutID(_id)
            setExercises(exercises)
        }
    }, [])

    useEffect(() => {
        saveWorkout({
            banner: imageURI,
            exercises: exercises,
            title: workoutName  || 'Desconhecido',
            anotation: anotation,
            _id: route?.params?.workout?._id || workout_id
        })
    }, [workoutName, anotation, imageURI, exercises])

    useEffect(() => {
        navigation.addListener('beforeRemove', async (e) => {

            await handleGoBack()

            navigation.getParent()?.setOptions({
                tabBarStyle: {
                    display: 'flex',
                    backgroundColor: theme.colors.darkBackground,
                    height: theme.sizes.tabBar,
                    justifyContent: 'center',
                }
            })
            setExercises([])
        })
    }, [])

    const handleGoBack = async () => {
        return new Promise<void>((resolve, reject) => {
            Alert.alert(
                'Atenção',
                'Deseja salvar as alterações?',
                [
                    {
                        text: 'Não',
                        style: 'cancel',
                        onPress: async () => {
                            if (!(route?.params?.workout)) await deleteWorkout(workout_id)
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
    }
    const handleImagePicker = async () => {
        const { assets } = await pickeImage()
        const uri = assets ? assets[0].uri : ''
        const finalUri = uri ? uri : ''

        setImageURI(finalUri)
    }

    return (
        <S.Container>
            <S.Header>
                <S.Left>
                    <S.GoBack onPress={() => navigation.goBack()}>
                        <AntDesign name='arrowleft' size={theme.sizes.icons.md} color={theme.colors.contrast} />
                    </S.GoBack>
                    <S.Title
                        value={workoutName}
                        onChangeText={(txt) => setWorkoutName(txt)}
                        placeholder='Título do treino'
                        placeholderTextColor={theme.colors.darkContrast}
                    />
                </S.Left>
                <S.ImagePickerButton onPress={handleImagePicker}>
                    <Feather name='image' size={theme.sizes.icons.sm} color={theme.colors.contrast} />
                </S.ImagePickerButton>
            </S.Header>



            <FlatList
                data={exercises}
                extraData={exercises}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <S.AnotationContainer>
                        <S.Anotation
                            value={anotation}
                            onChangeText={setAnotation}
                            placeholder='Anotação'
                            placeholderTextColor={theme.colors.darkText}
                        />
                    </S.AnotationContainer>
                )}
                renderItem={({ item }) => (
                    <ExerciseInWorkoutItem
                        item={item}
                        showRest={true}
                        showCreateSerie={true}
                        showDeleteSerieButton={true}
                        showSucessButton={false}
                        createSerieFunction={(exercise) => createSerie(exercise)}
                        deleteSerieFunction={(exercise, serieNumber) => deleteSerie(exercise, serieNumber)}
                        deleteExerciseFuntion={(exercise) => deleteExercise(exercise)}
                    />
                )}
                ListFooterComponent={() => (
                    <S.AddExerciseButton onPress={() => navigation.navigate('AddExercise')}>
                        <S.AddExerciseText>Adiconar exercício</S.AddExerciseText>
                    </S.AddExerciseButton>
                )}
            />

            {
                route?.params?.workout && (
                    <S.StartWorkout onPress={() => navigation.navigate('WorkoutSeason', { workout: { _id: workout_id, banner: imageURI, exercises: exercises, title: workoutName, anotation: anotation } })}>
                        <S.StartText>Iniciar treino</S.StartText>
                    </S.StartWorkout>
                )
            }

        </S.Container>

    )
}

export default CreateWorkout;