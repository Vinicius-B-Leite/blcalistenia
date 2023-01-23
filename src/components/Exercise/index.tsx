import React, { useContext } from 'react';
import { FlatList } from 'react-native';
import { ExerciseContext } from '../../contexts/ExerciseContext';
import { exercise } from '../../models/exercise';
import * as S from './styles'


type Prosp = { item: exercise }

const Exercise: React.FC<Prosp> = ({ item }) => {
    const { addExerciseToWorkout } = useContext(ExerciseContext)
    return (
        <S.ExerciseContainer onPress={() => addExerciseToWorkout({ exerciseId: item.name })}>
            <S.ExerciseName>{item.name}</S.ExerciseName>
            <FlatList
                data={item.muscles}
                horizontal
                renderItem={({ item: m }) => (
                    <S.ExerciseMuscles>{m}</S.ExerciseMuscles>
                )}
            />
        </S.ExerciseContainer>
    )
}

export default Exercise;