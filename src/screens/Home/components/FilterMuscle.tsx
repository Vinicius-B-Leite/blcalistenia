import React, { useState } from 'react';
import * as S from '../styles'
import { muscles } from '../../../utils/muscles';
import Muscle from '../../../components/Muscle';
import { WorkoutType } from '../../../models/WorkoutType';
import { ExerciseType } from '../../../models/ExerciseType';
import { useDispatch } from 'react-redux';
import { setWorkoutList } from '../../../features/WorkoutList/workoutListSlicer';
import { useQuery } from '../../../services/realm';
import { initialsExercises } from '../../../utils/initialsExercises';


const FilterMuscle: React.FC = () => {
    const [muscleFilterSelected, setMuscleFilterSelected] = useState('')
    const workouts = useQuery('Workout').toJSON() as WorkoutType[]
    const exercises = useQuery('Exercise').toJSON() as ExerciseType[]
    const dispatch = useDispatch()

    const filterWorkoutsByMuscle = (muscle: string) => {
        setMuscleFilterSelected(muscle)

        const exercisesHaveMuscleSelected = [
            ...exercises.filter(e => e.muscles.includes(muscle.toLowerCase())),
            ...initialsExercises.filter(e => e.muscles.includes(muscle.toLowerCase()))
        ]

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
        <S.CategotyList
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