import React, { useState, useCallback, createContext } from 'react';
import { ExercisesInWorkoutType } from '../models/ExercisesInWorkoutType';
import { useRealm } from './RealmContext';



type WorkoutContext = {
    addExercise: (newExercise: String) => void,
    setExercises: React.Dispatch<React.SetStateAction<ExercisesInWorkoutType[]>>,
    exercises: ExercisesInWorkoutType[],
}


export const WorkoutContext = createContext({} as WorkoutContext)


const WorkoutProvider = ({ children }: { children: React.ReactNode }) => {
    const [exercises, setExercises] = useState<ExercisesInWorkoutType[]>([])

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
    return (
        <WorkoutContext.Provider value={{
            addExercise,
            setExercises,
            exercises,            
        }}>
            {children}
        </WorkoutContext.Provider>
    )
}

export default WorkoutProvider;