import React, { useState, useContext, useEffect } from 'react';
import { FlatList, View, Text } from 'react-native';
import * as S from './styles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList, TabParamList } from '../../routes/Models';
import AddExercise from '../AddExercise';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ExerciseContext } from '../../contexts/ExerciseContext';
import ExerciseInWorkoutItem from '../../components/ExerciseInWorkoutItem';
import { WorkoutContext } from '../../contexts/WorkoutContext';

type Navigation = StackScreenProps<RootStackParamList, 'CreateWorkout'>

const CreateWorkout: React.FC<Navigation> = ({ route, navigation }) => {
    const theme = useTheme()
    const { exercisesInWorkout } = useContext(ExerciseContext)
    const { createWorkout } = useContext(WorkoutContext)
    const [workoutName, setWorkoutName] = useState('')
    const [anotation, setAnotation] = useState('')

    useEffect(() => {
        navigation.addListener('beforeRemove', () => {
            if (exercisesInWorkout.length > 0) {
                createWorkout({
                    banner: 'https://www.adobe.com/br/express/feature/image/media_1bb4d071398492506a1b76b3b6f9d69a5e96d7ffc.png?width=750&format=png&optimize=medium',
                    title: workoutName || 'Desconhecido',
                    exercises: exercisesInWorkout,
                    anotation: anotation
                })
            }
        })
    }, [])

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <S.Container>
                <S.Header>
                    <S.Left>
                        <S.GoBack onPress={() => navigation.goBack()}>
                            <AntDesign name='arrowleft' size={theme.sizes.icons.md} color={theme.colors.contrast} />
                        </S.GoBack>
                        <S.Title
                            value={workoutName}
                            onChangeText={setWorkoutName}
                            placeholder='Título do treino'
                            placeholderTextColor={theme.colors.darkContrast}
                        />
                    </S.Left>
                    <Feather name='image' size={theme.sizes.icons.sm} color={theme.colors.contrast} />
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
                    renderItem={({ item }) => <ExerciseInWorkoutItem item={item} />}
                    ListFooterComponent={() => (
                        <S.AddExerciseButton onPress={() => navigation.navigate('AddExercise')}>
                            <S.AddExerciseText>Adiconar exercício</S.AddExerciseText>
                        </S.AddExerciseButton>
                    )}
                />

            </S.Container>

        </GestureHandlerRootView>
    )
}

export default CreateWorkout;