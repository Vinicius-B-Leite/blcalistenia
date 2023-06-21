import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import * as S from '../styles'
import { SuggestWorkoutType, WorkoutLevel } from '../../../models/SuggestsWorkoutType';
import Workout from '../../../components/Workout';
import { useRealm } from '../../../contexts/RealmContext';
import { WorkoutType } from '../../../models/WorkoutType';
import { suggests } from '../../../utils/suggestsWorkout';

const WorkoutSuggest: React.FC = () => {
    const [workoutLeveSuggest, setWorkoutLevelSuggest] = useState<WorkoutLevel>('begginer')
    const [suggestsWorkouts, setSuggestsWorkouts] = useState<WorkoutType[]>([])
    const { realm } = useRealm()


    useEffect(() => {
        getSuggestsWorkouts(workoutLeveSuggest)
    }, [realm])

    const getSuggestsWorkouts = (level: WorkoutLevel) => {

        if (realm) {
            const workouts = realm.objects<SuggestWorkoutType[]>('SuggestWorkout').filtered(`level == '${level}'`).toJSON() as SuggestWorkoutType[]

            if (workouts.length < 1) {
                const sw = createSuggestsWorkouts()
                sw && setSuggestsWorkouts(sw)
                return
            }
            setSuggestsWorkouts(workouts.map(w => JSON.parse(w.workout)))
        }
    }

    const createSuggestsWorkouts = () => {
        if (realm) {

            let arraySuggests: SuggestWorkoutType[] = []

            suggests.forEach(w => {
                realm.write(() => {
                    let respose = realm.create<SuggestWorkoutType>('SuggestWorkout', {
                        id: w.id,
                        level: w.level,
                        workout: JSON.stringify(w.workout)
                    }).toJSON() as SuggestWorkoutType
                    arraySuggests.push(respose)
                })
            });

            let arraySuggestsWorkouts: WorkoutType[] = arraySuggests.map(s => JSON.parse(s.workout))
            return arraySuggestsWorkouts
        }
    }

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