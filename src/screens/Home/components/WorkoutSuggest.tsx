import React, { useState } from 'react';
import * as S from '../styles'
import { WorkoutLevel } from '../../../models/SuggestsWorkoutType';
import Workout from '../../../components/Workout';
import { suggests } from '../../../utils/suggestsWorkout';

const WorkoutSuggest: React.FC = () => {
    const [workoutLeveSuggest, setWorkoutLevelSuggest] = useState<WorkoutLevel>('intermate')

    const workoutSuggestFilteredByLevel = suggests.filter(v => v.level === workoutLeveSuggest)

    const handleChangeWorkoutLevel = () => {
        setWorkoutLevelSuggest(oldLevel => oldLevel === 'begginer' ? 'intermate' : 'begginer')
    }

    return (
        <S.WorkoutContainer>
            <S.Row>
                <S.Title>Treinos recomendados</S.Title>
                <S.LevelButton onPress={handleChangeWorkoutLevel}>
                    <S.LevelText>{workoutLeveSuggest === 'begginer' ? 'iniciante' : 'intermediário'}</S.LevelText>
                </S.LevelButton>
            </S.Row>
            <S.WorkoutList
                data={workoutSuggestFilteredByLevel.map(v => JSON.parse(v.workout))}
                showsHorizontalScrollIndicator={false}
                horizontal
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <Workout data={item} />}
            />
        </S.WorkoutContainer>
    )
}

export default WorkoutSuggest;