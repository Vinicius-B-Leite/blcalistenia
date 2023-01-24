import React, { createContext, useState } from 'react'
import { exercise } from '../models/exercise'
import { exercisesInWorkout } from '../models/exercisesInWorkout'
import { getRealm } from '../services/realm'
import { initialsExercises } from '../utils/initialsExercises'

type ExerciseContextType = {
    getExercises: () => Promise<void>,
    exercisList: exercise[],
    createExercise: ({ name, muscles, categories }: exercise) => Promise<void>,
    deleteExercise: (exerciseName: String) => Promise<void>
}

export const ExerciseContext = createContext({} as ExerciseContextType)

export const ExerciseProvider = ({ children }: { children: React.ReactNode }) => {

    const [exercisList, setExerciseList] = useState<exercise[]>([])

    const createExercise = ({ name, muscles, categories }: exercise) => {
        return new Promise<void>(async (res, rej) => {
            try {
                const realm = await getRealm()

                realm.write(() => {
                    const exerciseResponse = realm.create<exercise>('Exercise', {
                        name,
                        muscles,
                        categories
                    }).toJSON() as exercise

                    setExerciseList(old => [...old, exerciseResponse])
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

                const exercises = realm.objects<exercise[]>('Exercise').sorted('name').toJSON() as exercise[]

                if (exercises.length === 0) {
                    initialsExercises.forEach(exercise => {
                        createExercise(exercise)
                    })
                    return
                }
                exercises.sort()
                setExerciseList(exercises)
                resolve()
            } catch (error) {
                reject(error)
            }
        })
    }
    const deleteExercise = async (exerciseName: String) => {
        const realm = await getRealm()
        realm.write(() =>{
            realm.delete(realm.objectForPrimaryKey('Exercise', exerciseName as string ))
            setExerciseList(old => {
                const index = old.findIndex((v) => v.name == exerciseName)
                old.splice(index, 1)
                return [...old]
            })
        })

    }

    return (
        <ExerciseContext.Provider value={{
            getExercises,
            exercisList,
            createExercise,
            deleteExercise
        }}>
            {children}
        </ExerciseContext.Provider>
    )
}