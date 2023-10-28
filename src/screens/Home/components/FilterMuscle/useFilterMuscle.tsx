import { useState } from 'react';
import { WorkoutType } from '@/models/WorkoutType';
import { ExerciseType } from '@/models/ExerciseType';
import { useDispatch } from 'react-redux';
import { cancelFilteredWorkout, filteredWorkouts } from '@/features/WorkoutList/workoutListSlicer';
import { useQuery } from '@/services/realm/realm';
import { initialsExercises } from '@/utils/initialsExercises';

export default function useFilterMuscle() {
    const dispatch = useDispatch()

    const workouts = useQuery('Workout').toJSON() as WorkoutType[]
    const exercises = useQuery('Exercise').toJSON() as ExerciseType[]

    const [muscleFilterSelected, setMuscleFilterSelected] = useState('')

    const filterWorkoutsByMuscle = (muscle: string) => {

        if (muscleFilterSelected === muscle) {
            dispatch(cancelFilteredWorkout())
            setMuscleFilterSelected('')
            return
        }
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
        dispatch(filteredWorkouts(workoutsWithMuscleSelected))
    }


    return {
        filterWorkoutsByMuscle,
        muscleFilterSelected
    }
}