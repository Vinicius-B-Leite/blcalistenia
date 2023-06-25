import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import * as S from '../styles'
import { WorkoutLevel } from '../../../models/SuggestsWorkoutType';
import Workout from '../../../components/Workout';
import { WorkoutType } from '../../../models/WorkoutType';
import { suggests } from '../../../utils/suggestsWorkout';

const WorkoutSuggest: React.FC = () => {
    const [workoutLeveSuggest, setWorkoutLevelSuggest] = useState<WorkoutLevel>('begginer')
    const [suggestsWorkouts, setSuggestsWorkouts] = useState<WorkoutType[]>(suggests.map(w => JSON.parse(w.workout)))


    return (
        <S.WorkoutContainer>
            <S.Row>
                <S.Title>Treinos recomendados</S.Title>
                <S.LevelButton>
                    <S.LevelText>iniciante</S.LevelText>
                </S.LevelButton>
            </S.Row>
            <S.WorkoutList
                data={suggestsWorkouts}
                showsHorizontalScrollIndicator={false}
                horizontal
                keyExtractor={(item) => item._id}
                renderItem={({ item, index }) => <Workout data={item} />}
            />
        </S.WorkoutContainer>
    )
}

export default WorkoutSuggest;