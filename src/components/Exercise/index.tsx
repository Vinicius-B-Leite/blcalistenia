import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NativeStackNavigatorProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { FlatList } from 'react-native';
import { ExerciseContext } from '../../contexts/ExerciseContext';
import { WorkoutContext } from '../../contexts/WorkoutContext';
import { exercise } from '../../models/exercise';
import { RootStackParamList } from '../../routes/Models';
import * as S from './styles'


type Prosp = { item: exercise }

type Navigation = StackNavigationProp<RootStackParamList, 'AddExercise'>

const Exercise: React.FC<Prosp> = ({ item }) => {
    const navigation = useNavigation<Navigation>()
    const { addExercise } = useContext(WorkoutContext)

    const handleAddExercise = async () => {
        await addExercise(item.name)
        navigation.goBack()
    }

    return (
        <S.ExerciseContainer onPress={handleAddExercise}>
            <S.ExerciseName>{item.name}</S.ExerciseName>
            <FlatList
                data={item.muscles}
                horizontal
                renderItem={({ item: m }) => (
                    <S.ExerciseMuscles>{m}</S.ExerciseMuscles>
                )}
            />
        </S.ExerciseContainer >
    )
}

export default Exercise;