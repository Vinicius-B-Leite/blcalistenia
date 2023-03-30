import React, { useState, useCallback, createContext } from 'react';
import { ExercisesInWorkoutType } from '../models/ExercisesInWorkoutType';
import { useRealm } from './RealmContext';



type WorkoutContext = {
    addExercise: (newExercise: String) => void,
    deleteWorkout: (workoutID: string) => void
    setExercises: React.Dispatch<React.SetStateAction<ExercisesInWorkoutType[]>>,
    exercises: ExercisesInWorkoutType[],
}


export const WorkoutContext = createContext({} as WorkoutContext)


const WorkoutProvider = ({ children }: { children: React.ReactNode }) => {
    const [exercises, setExercises] = useState<ExercisesInWorkoutType[]>([])
    const { realm } = useRealm()

    const addExercise = useCallback((newExercise: String) => {
        setExercises(old => [
            ...old,
            {
                exercise_id: newExercise,
                series: [
                    {
                        rep: 8,
                        rest: 60,
                        serie: 1
                    }
                ]
            }
        ])

    }, [])



    const deleteWorkout = useCallback((workoutID: string) => {
        realm && realm.write(() => {
            realm.delete(realm.objectForPrimaryKey('Workout', workoutID))
        })
    }, [realm])

    return (
        <WorkoutContext.Provider value={{
            addExercise,
            setExercises,
            exercises,
            deleteWorkout,
        }}>
            {children}
        </WorkoutContext.Provider>
    )
}

export default WorkoutProvider;