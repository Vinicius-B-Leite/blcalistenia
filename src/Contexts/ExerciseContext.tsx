import React, { createContext, useState } from 'react'
import { exercise } from '../models/exercise'
import { exercisesInWorkout } from '../models/exercisesInWorkout'
import { getRealm } from '../services/realm'
import { initialsExercises } from '../utils/initialsExercises'

type ExerciseContextType = {
    getExercises: () => Promise<void>,
    exercisList: exercise[],
    createExercise: ({ name, muscles, categories }: exercise) => Promise<void>,

}

export const ExerciseContext = createContext({} as ExerciseContextType)

export const ExerciseProvider = ({ children }: { children: React.ReactNode }) => {

    const [exercisList, setExerciseList] = useState<exercise[]>([])

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


    return (
        <ExerciseContext.Provider value={{
            getExercises,
            exercisList,
            createExercise,
        }}>
            {children}
        </ExerciseContext.Provider>
    )
}