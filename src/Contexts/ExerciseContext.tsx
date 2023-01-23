import React, { createContext, useState } from 'react'
import { exercise } from '../models/exercise'
import { exercisesInWorkout } from '../models/exercisesInWorkout'
import { getRealm } from '../services/realm'
import { initialsExercises } from '../utils/initialsExercises'

type ExerciseContextType = {
    getExercises: () => Promise<void>,
    exercisList: exercise[],
    createExercise: ({ name, muscles, categories }: exercise) => Promise<void>,
    addExerciseToWorkout: ({ exerciseId }: { exerciseId: String }) => Promise<void>,
    exercisesInWorkout: exercisesInWorkout[],
    changeSeriesInExerciseWorkout: (item: exercisesInWorkout, serie: Number, newRep?: Number, newRest?: Number) => void
}

export const ExerciseContext = createContext({} as ExerciseContextType)

export const ExerciseProvider = ({ children }: { children: React.ReactNode }) => {

    const [exercisList, setExerciseList] = useState<exercise[]>([])
    const [exercisesInWorkout, setExerciseInWorkout] = useState<exercisesInWorkout[]>([])

    const createExercise = ({ name, muscles, categories }: exercise) => {
        return new Promise<void>(async (res, rej) => {
            try {
                const realm = await getRealm()

                realm.write(() => {
                    realm.create<exercise>('Exercise', {
                        name,
                        muscles,
                        categories
                    })
                })
                res()
            } catch (error) {
                rej(error)
            }
        })
    }
    const getExercises = async () => {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const realm = await getRealm()

                const exercises = realm.objects<exercise[]>('Exercise').sorted('name').toJSON()

                if (exercises.length === 0) {
                    initialsExercises.forEach(exercise => {
                        realm.write(() => {
                            let createdExercise = realm.create<exercise>('Exercise', {
                                name: exercise.name,
                                categories: exercise.categories,
                                muscles: exercise.muscles
                            })
                            setExerciseList(old => [...old, createdExercise as exercise])
                        })
                    })

                    return
                }

                setExerciseList(exercises as exercise[])
                resolve()
            } catch (error) {
                reject(error)
            }
        })
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
    const changeSeriesInExerciseWorkout = (item: exercisesInWorkout, serie: Number, newRep?: Number, newRest?: Number) => {
        let exercisesInWorkoutCopy = exercisesInWorkout
        const exerciseIndex = exercisesInWorkoutCopy.indexOf(item)
        const serieIndex = exercisesInWorkoutCopy[exerciseIndex].series.findIndex((value, index, object) => value.serie === serie)
        if (newRep){
            exercisesInWorkoutCopy[exerciseIndex].series[serieIndex].rep = newRep
        }
        else if (newRest){
            exercisesInWorkoutCopy[exerciseIndex].series[serieIndex].rest = newRest
        }
        setExerciseInWorkout(exercisesInWorkoutCopy)
    }
    return (
        <ExerciseContext.Provider value={{
            getExercises,
            exercisList,
            createExercise,
            addExerciseToWorkout,
            exercisesInWorkout,
            changeSeriesInExerciseWorkout
        }}>
            {children}
        </ExerciseContext.Provider>
    )
}