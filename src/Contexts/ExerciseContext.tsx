import React, { createContext, useState } from 'react'
import { ExerciseType } from '../models/ExerciseType'
import { getRealm } from '../services/realm'
import { initialsExercises } from '../utils/initialsExercises'
import { useRealm } from './RealmContext'

type ExerciseContextType = {
    getExercises: (text?: string) => void,
    filterExercises: (category: string, muscle: string) => void,
    exercisList: ExerciseType[],
    createExercise: ({ name, muscles, categories }: ExerciseType) => void,
    deleteExercise: (exerciseName: String) => void
}

export const ExerciseContext = createContext({} as ExerciseContextType)

export const ExerciseProvider = ({ children }: { children: React.ReactNode }) => {

    const [exercisList, setExerciseList] = useState<ExerciseType[]>([])
    const { realm } = useRealm()


    const createExercise = ({ name, muscles, categories }: ExerciseType) => {

        if (realm) {

            realm.write(() => {
                const exerciseResponse = realm.create<ExerciseType>('Exercise', {
                    name,
                    muscles,
                    categories
                }).toJSON() as ExerciseType

                setExerciseList(old => [...old, exerciseResponse])
            })
        }


    }
    const getExercises = async (text?: string) => {
        if (realm) {

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
        }
    }
    const filterExercises = async (category: string, muscle: string) => {
        if (realm) {
            const exerciesesFiltereds = realm.objects('Exercise')
                .filtered(`categories CONTAINS  '${category}'`)
                .filtered(`muscles CONTAINS '${muscle}'`)
                .toJSON() as ExerciseType[]

            setExerciseList([...exerciesesFiltereds])
        }

    }
    const deleteExercise = async (exerciseName: String) => {
        if (realm) {
            realm.write(() => {
                realm.delete(realm.objectForPrimaryKey('Exercise', exerciseName as string))
                setExerciseList(old => {
                    const index = old.findIndex((v) => v.name == exerciseName)
                    old.splice(index, 1)
                    return [...old]
                })
            })
        }
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