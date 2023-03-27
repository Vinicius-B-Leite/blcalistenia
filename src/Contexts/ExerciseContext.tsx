import React, { createContext, useState } from 'react'
import { ExerciseType } from '../models/ExerciseType'
import { getRealm  } from '../services/realm'
import { initialsExercises } from '../utils/initialsExercises'

type ExerciseContextType = {
    getExercises: (text?: string) => Promise<void>,
    filterExercises: (category: string, muscle: string) => Promise<void>,
    exercisList: ExerciseType[],
    createExercise: ({ name, muscles, categories }: ExerciseType) => Promise<void>,
    deleteExercise: (exerciseName: String) => Promise<void>
}

export const ExerciseContext = createContext({} as ExerciseContextType)

export const ExerciseProvider = ({ children }: { children: React.ReactNode }) => {

    const [exercisList, setExerciseList] = useState<ExerciseType[]>([])

    const createExercise = ({ name, muscles, categories }: ExerciseType) => {
        return new Promise<void>(async (res, rej) => {
            try {
                const realm = await getRealm()

                realm.write(() => {
                    const exerciseResponse = realm.create<ExerciseType>('Exercise', {
                        name,
                        muscles,
                        categories
                    }).toJSON() as ExerciseType

                    setExerciseList(old => [...old, exerciseResponse])
                })
                res()
            } catch (error) {
                rej(error)
            }
        })
    }
    const getExercises = async (text?: string) => {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const realm = await getRealm()

                let exercises = realm.objects<ExerciseType[]>('Exercise').sorted('name').toJSON() as ExerciseType[]

                if (exercises.length === 0) {
                    initialsExercises.forEach(exercise => {
                        createExercise(exercise)
                    })
                    return
                }
                if (text) {
                    exercises = realm.objects<ExerciseType[]>('Exercise').filtered(`name CONTAINS '${text}'`).toJSON() as ExerciseType[]
                }
                exercises.sort()
                setExerciseList(exercises)
                resolve()
            } catch (error) {
                reject(error)
            }
        })
    }
    const filterExercises = async (category: string, muscle: string) => {
        const realm = await getRealm()
        const exerciesesFiltereds = realm.objects('Exercise')
            .filtered(`categories CONTAINS  '${category}'`)
            .filtered(`muscles CONTAINS '${muscle}'`)
            .toJSON() as ExerciseType[]

        setExerciseList([...exerciesesFiltereds])


    }
    const deleteExercise = async (exerciseName: String) => {
        const realm = await getRealm()
        realm.write(() => {
            realm.delete(realm.objectForPrimaryKey('Exercise', exerciseName as string))
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
            filterExercises,
            exercisList,
            createExercise,
            deleteExercise
        }}>
            {children}
        </ExerciseContext.Provider>
    )
}