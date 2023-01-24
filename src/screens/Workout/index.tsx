import React, { useContext, useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { FlatList } from 'react-native';
import { RootStackParamList } from '../../routes/Models';
import * as S from './styles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { WorkoutContext } from '../../contexts/WorkoutContext';
import { useTheme } from 'styled-components/native';
import ExerciseInWorkoutItem from '../../components/ExerciseInWorkoutItem';
import Feather from 'react-native-vector-icons/Feather'
import { pickeImage } from '../../utils/pickImage';
import Ionicons from 'react-native-vector-icons/Ionicons'


type Props = StackScreenProps<RootStackParamList, 'Workout'>

const Workout: React.FC<Props> = ({ navigation, route }) => {

    const theme = useTheme()
    const { getSingleWorkout, workout } = useContext(WorkoutContext)

    useEffect(() => {
        getSingleWorkout(route.params.workout_id as number)
    }, [])

  

    return (
        <S.Container>
            <S.Header>
                <S.Left>
                    <S.GoBack onPress={() => navigation.goBack()}>
                        <AntDesign name='arrowleft' size={theme.sizes.icons.md} color={theme.colors.contrast} />
                    </S.GoBack>
                    <S.Title>{workout?.title}</S.Title>
                </S.Left>
                <S.ImagePickerButton>
                    <Ionicons name='pencil' size={theme.sizes.icons.sm} color={theme.colors.text} />
                </S.ImagePickerButton>
            </S.Header>

            {
                workout?.anotation && (
                    <S.AnotationContainer>
                        <S.Anotation>{workout.anotation}</S.Anotation>
                    </S.AnotationContainer>
                )
            }

            <FlatList
                data={workout?.exercises}
                extraData={workout?.exercises}
                removeClippedSubviews={false}
                renderItem={({ item }) => <ExerciseInWorkoutItem createSerieType='workout' item={item} />}
                ListFooterComponent={() => (
                    <S.AddExerciseButton onPress={() => navigation.navigate('AddExercise')}>
                        <S.AddExerciseText>Adiconar exercício</S.AddExerciseText>
                    </S.AddExerciseButton>
                )}
            />


        </S.Container>
    )
}

export default Workout;