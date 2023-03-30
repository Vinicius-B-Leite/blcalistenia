import React, { createContext, useState, useCallback, useMemo } from 'react';
import { ExerciseType } from '../models/ExerciseType';
import { ExercisesInWorkoutType } from '../models/ExercisesInWorkoutType';
import { WorkoutType } from '../models/WorkoutType';
import { getRealm } from '../services/realm';
import { muscles } from '../utils/muscles';
import { SerieType } from '../models/SerieType';
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

    const returnValue = useMemo(() => ({
        addExercise,
        setExercises,
        exercises,
        deleteWorkout
    }), [exercises])
    return (
        <WorkoutContext.Provider value={returnValue}>
            {children}
        </WorkoutContext.Provider>
    )
}

export default WorkoutProvider;