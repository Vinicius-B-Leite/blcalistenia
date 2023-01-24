import React, { useState, useContext, useEffect } from 'react';
import { FlatList, View, Text } from 'react-native';
import * as S from './styles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { useTheme } from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList, TabParamList } from '../../routes/Models';
import ExerciseInWorkoutItem from '../../components/ExerciseInWorkoutItem';
import { WorkoutContext } from '../../contexts/WorkoutContext';
import { ExerciseInWorkoutContext } from '../../contexts/ExercisesInWorkout';
import { pickeImage } from '../../utils/pickImage';

type Navigation = StackScreenProps<RootStackParamList, 'CreateWorkout'>

const CreateWorkout: React.FC<Navigation> = ({ route, navigation }) => {
    const theme = useTheme()
    const { exercisesInWorkout } = useContext(ExerciseInWorkoutContext)
    const { createWorkout } = useContext(WorkoutContext)
    const [workoutName, setWorkoutName] = useState('')
    const [anotation, setAnotation] = useState('')
    let imageURI = ''

    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            if (imageURI.length > 0 && workoutName.length > 0 && exercisesInWorkout.length > 0) {
                createWorkout({
                    banner: imageURI,
                    title: workoutName,
                    exercises: exercisesInWorkout,
                    anotation: anotation
                })
            }

        })
    }, [])

    const handleImagePicker = async () => {
        const { assets } = await pickeImage()
        const uri = assets ? assets[0].uri : ''
        const finalUri = uri ? uri : ''

        imageURI = finalUri
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

            <S.AnotationContainer>
                <S.Anotation
                    value={anotation}
                    onChangeText={setAnotation}
                    placeholder='Anotação'
                    placeholderTextColor={theme.colors.darkText}
                />
            </S.AnotationContainer>

            <FlatList
                data={exercisesInWorkout}
                extraData={exercisesInWorkout}
                removeClippedSubviews={false}

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