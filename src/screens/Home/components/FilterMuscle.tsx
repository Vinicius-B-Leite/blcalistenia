import React, { useState } from 'react';
import { View } from 'react-native';
import * as S from '../styles'
import { muscles } from '../../../utils/muscles';
import Muscle from '../../../components/Muscle';
import { WorkoutType } from '../../../models/WorkoutType';
import { ExerciseType } from '../../../models/ExerciseType';
import { useRealm } from '../../../contexts/RealmContext';
import { useDispatch } from 'react-redux';
import { setWorkoutList } from '../../../features/WorkoutList/workoutListSlicer';


const FilterMuscle: React.FC = () => {
    const [muscleFilterSelected, setMuscleFilterSelected] = useState('')
    const { realm } = useRealm()
    const dispatch = useDispatch()

    const filterWorkoutsByMuscle = (muscle: string) => {
        if (!realm) return
        setMuscleFilterSelected(muscle)

        let workouts = realm.objects('Workout').toJSON() as WorkoutType[]
        const exercises = realm?.objects('Exercise').toJSON() as ExerciseType[]

        const exercisesHaveMuscleSelected = exercises.filter(e => e.muscles.includes(muscle))

        let workoutsWithMuscleSelected: WorkoutType[] = []
        workouts.forEach(w => {
            w.exercises.forEach(e => {
                const index = exercisesHaveMuscleSelected.findIndex(v => v.name == e.exercise_id)
                if (index > -1) workoutsWithMuscleSelected.push(w)
            })
        })
        dispatch(setWorkoutList(workoutsWithMuscleSelected))
    }

    return (
        < S.CategotyList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={muscles}
            keyExtractor={(item) => item}
            renderItem={({ item }) =>
                <Muscle
                    muscle={item}
                    muscleSelected={muscleFilterSelected}
                    onClick={(m) => filterWorkoutsByMuscle(m)} />}
        />
    )
}

export default FilterMuscle;