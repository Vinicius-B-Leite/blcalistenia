import { StackScreenProps } from '@react-navigation/stack';
import React, { useRef, useState } from 'react';
import { FlatList } from 'react-native'
import { useTheme } from 'styled-components/native';
import { RootStackParamList } from '../../routes/Models';
import * as S from './styles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import ExerciseInWorkoutItem from '../../components/ExerciseInWorkoutItem';

type Navigation = StackScreenProps<RootStackParamList, 'WorkoutSeason'>

const WorkoutSeason: React.FC<Navigation> = ({ navigation, route }) => {
    const theme = useTheme()
    const { workout } = route.params

    return (
        <S.Container>
            <S.Header>
                <S.Left>
                    <S.GoBack onPress={() => navigation.goBack()}>
                        <AntDesign name='arrowleft' size={theme.sizes.icons.md} color={theme.colors.contrast} />
                    </S.GoBack>
                    <S.Title numberOfLines={1}>{workout.title}</S.Title>
                </S.Left>
                <S.CancelWorkoutBtn>
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

                renderItem={({ item }) => <ExerciseInWorkoutItem item={item} enableChanges={false} />}

            />
        </S.Container >
    )
}

export default WorkoutSeason;