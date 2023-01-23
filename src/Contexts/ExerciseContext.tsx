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
                console.log("🚀 ~ file: ExerciseContext.tsx:46 ~ returnnewPromise<void> ~ exercises", exercises)

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
    return (
        <ExerciseContext.Provider value={{ getExercises, exercisList, createExercise, addExerciseToWorkout, exercisesInWorkout }}>
            {children}
        </ExerciseContext.Provider>
    )
}