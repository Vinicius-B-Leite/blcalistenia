import React, { createContext, useState } from 'react';
import { View } from 'react-native';
import { exercisesInWorkout } from '../models/exercisesInWorkout';

type ExerciseInWorkoutType = {
    addExerciseToWorkout: ({ exerciseId }: { exerciseId: String }) => Promise<void>,
    exercisesInWorkout: exercisesInWorkout[],
    updateSeries: (item: exercisesInWorkout, serie: Number, newRep?: Number, newRest?: Number) => void,
    createSerie: (item: exercisesInWorkout) => void
}
type Props = {
    children: React.ReactNode
}

export const ExerciseInWorkoutContext = createContext({} as ExerciseInWorkoutType)


const ExerciseInWorkoutProvider: React.FC<Props> = ({ children }) => {

    const [exercisesInWorkout, setExerciseInWorkout] = useState<exercisesInWorkout[]>([])


    const createSerie = (item: exercisesInWorkout) => {

        setExerciseInWorkout(old => {
            let exercisesInWorkoutCopy = old
            const exerciseIndex = exercisesInWorkoutCopy.indexOf(item)
            exercisesInWorkoutCopy[exerciseIndex].series.push({
                serie: exercisesInWorkoutCopy[exerciseIndex].series.length + 1,
                rep: 8,
                rest: 30
            })
            return exercisesInWorkoutCopy
        })
    }
    const updateSeries = (item: exercisesInWorkout, serie: Number, newRep?: Number, newRest?: Number) => {
        let exercisesInWorkoutCopy = exercisesInWorkout
        const exerciseIndex = exercisesInWorkoutCopy.indexOf(item)
        const serieIndex = exercisesInWorkoutCopy[exerciseIndex].series.findIndex((value, index, object) => value.serie === serie)
        if (newRep) {
            exercisesInWorkoutCopy[exerciseIndex].series[serieIndex].rep = newRep
        }
        else if (newRest) {
            exercisesInWorkoutCopy[exerciseIndex].series[serieIndex].rest = newRest
        }
        setExerciseInWorkout(exercisesInWorkoutCopy)
    }
    const addExerciseToWorkout = async ({ exerciseId }: { exerciseId: String }) => {

        setExerciseInWorkout(old => [...old, {
            exercise_id: exerciseId,
            series: [
                {
                    serie: 1,
                    rep: 5,
                    rest: 40
                }
            ]
        }])

    }

    return (
        <ExerciseInWorkoutContext.Provider
            value={{
                createSerie,
                updateSeries,
                addExerciseToWorkout,
                exercisesInWorkout,
            }}
        >
            {children}
        </ExerciseInWorkoutContext.Provider>
    )
}
export default ExerciseInWorkoutProvider;