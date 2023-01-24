import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import { FlatList, View, Text } from 'react-native';
import * as S from './styles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { useTheme } from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/Models';
import ExerciseInWorkoutItem from '../../components/ExerciseInWorkoutItem';
import { WorkoutContext } from '../../contexts/WorkoutContext';
import { pickeImage } from '../../utils/pickImage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'



type Navigation = StackScreenProps<RootStackParamList, 'CreateWorkout'>

const CreateWorkout: React.FC<Navigation> = ({ route, navigation }) => {
    const theme = useTheme()
    const { createInitialWorkout, saveWorkout, exercises, getSingleWorkout, workout, deleteWorkout, clean } = useContext(WorkoutContext)
    const [workoutName, setWorkoutName] = useState('')
    const [anotation, setAnotation] = useState('')
    const [imageURI, setImageURI] = useState('')
    const workout_id = route?.params?.workout_id



    useLayoutEffect(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: {
                display: 'none'
            }
        })
        if (typeof workout_id !== 'undefined') {
            getSingleWorkout(workout_id as number).then(data => {
                setWorkoutName(data.title as string)
                setAnotation(data.anotation ? data.anotation as string : '')
                setImageURI(data.banner)
            })

        } else {
            createInitialWorkout()
        }
    }, [])

    useEffect(() => {



        navigation.addListener('beforeRemove', (e) => {
            if (workout.title == '') {
                deleteWorkout()
            }

            clean()

            navigation.getParent()?.setOptions({
                tabBarStyle: {
                    display: 'flex',
                    backgroundColor: theme.colors.darkBackground,
                    height: theme.sizes.tabBar,
                    justifyContent: 'center',
                }
            })
        })


    }, [])

    useEffect(() => {
        if (workoutName != '' && exercises.length > 0) {
            saveWorkout({
                _id: workout._id,
                banner: imageURI,
                exercises: exercises,
                title: workoutName,
                anotation: anotation
            })
        }
    }, [workoutName, anotation, exercises, imageURI])

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
                removeClippedSubviews={false}
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
                renderItem={({ item }) => <ExerciseInWorkoutItem item={item} />}
                ListFooterComponent={() => (
                    <S.AddExerciseButton onPress={() => navigation.navigate('AddExercise')}>
                        <S.AddExerciseText>Adiconar exercício</S.AddExerciseText>
                    </S.AddExerciseButton>
                )}
            />

        </S.Container>

    )
}

export default CreateWorkout;