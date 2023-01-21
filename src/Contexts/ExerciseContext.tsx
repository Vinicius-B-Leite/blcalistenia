import React, { createContext, useState } from 'react'
import { exercise } from '../models/exercise'
import { getRealm } from '../services/realm'

type ExerciseContextType = {
    getExercises: () => Promise<void>,
    exercisList: exercise[]
}

export const ExerciseContext = createContext({} as ExerciseContextType)

export const ExerciseProvider = ({ children }: { children: React.ReactNode }) => {

    const [exercisList, setExerciseList] = useState<exercise[]>([])

    const getExercises = async () => {
        return new Promise<void>(async (resolve, reject) => {
            const realm = await getRealm()

            const exercises = realm.objects<exercise[]>('Exercise').sorted('name').toJSON()

            if (exercises.length === 0) {
                realm.write(() => {
                    realm.create<exercise>('Exercise', {
                        name: 'Flexão',
                        muscles: 'peitoral, ombro, triceps',
                        type: 'rep'
                    })
                })
            }

            setExerciseList(exercises as exercise[])
            resolve()
        })
    }

    return (
        <ExerciseContext.Provider value={{ getExercises, exercisList }}>
            {children}
        </ExerciseContext.Provider>
    )
}