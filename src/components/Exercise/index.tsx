import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo, useContext, useCallback } from 'react';
import {  Alert } from 'react-native';
import { WorkoutContext } from '../../contexts/WorkoutContext';
import { ExerciseType } from '../../models/ExerciseType';
import { RootStackParamList } from '../../routes/Models';
import * as S from './styles'
import { FlashList } from '@shopify/flash-list'
import { FlatList } from 'react-native';


type Prosp = { item: ExerciseType, deleteExercise: (exerciseName: String) => void }

type Navigation = StackNavigationProp<RootStackParamList, 'AddExercise'>

const Exercise: React.FC<Prosp> = ({ item, deleteExercise }) => {
    const navigation = useNavigation<Navigation>()
    const { addExercise } = useContext(WorkoutContext)

    const handleAddExercise = useCallback(() => {
        addExercise(item.name)
        navigation.goBack()
    }, [])

    const handleDelete = () => {
        Alert.alert(
            'Deletar exercício',
            'Você deseja deletar o exercício ' + item.name,
            [
                {
                    text: 'Sim',
                    onPress: () => deleteExercise(item.name)
                },
                {
                    text: 'Não',
                    style: 'cancel'
                }
            ],
            {
                cancelable: true,
            }
        )
    }

    console.log('Exercise render')

    return (
        <S.ExerciseContainer onPress={handleAddExercise} onLongPress={handleDelete}>
            <S.ExerciseName>{item.name}</S.ExerciseName>
            <FlatList
                data={item.muscles}
                horizontal
                
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                renderItem={({ item: m }) => (
                    <S.ExerciseMuscles>{m}</S.ExerciseMuscles>
                )}
            />
        </S.ExerciseContainer >
    )
}

export default memo(Exercise);