import React, { createContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { SuggestWorkoutType, WorkoutLevel } from '../models/SuggestsWorkoutType';
import { getRealm } from '../services/realm';
import uuid from 'react-native-uuid'
import { suggests } from '../utils/suggestsWorkout';
import { WorkoutType } from '../models/WorkoutType';


type SuggestsWorkoutContext = {
    getSuggestsWorkouts: (level: WorkoutLevel) => Promise<void>,
    suggestsWorkouts: WorkoutType[]
}

type Props = {
    children: React.ReactNode
}

export const SuggestWorkoutContext = createContext({} as SuggestsWorkoutContext)

const SuggestWorkoutProvider: React.FC<Props> = ({ children }) => {

    const [suggestsWorkouts, setSuggestsWorkouts] = useState<WorkoutType[]>([])

    const createSuggestsWorkouts = async () => {
        const realm = await getRealm()
        let arraySuggests: SuggestWorkoutType[] = []

        realm.write(() => {
            suggests.forEach(w => {
                let respose = realm.create<SuggestWorkoutType>('SuggestWorkout', {
                    id: w.id,
                    level: w.level,
                    workout: JSON.stringify(w.workout)
                }).toJSON() as SuggestWorkoutType
                arraySuggests.push(respose)
            });
        })

        let arraySuggestsWorkouts: WorkoutType[] = arraySuggests.map(s => JSON.parse(s.workout))
        return arraySuggestsWorkouts
    }

    const getSuggestsWorkouts = async (level: WorkoutLevel) => {
        const realm = await getRealm()

        const workouts = realm.objects<SuggestWorkoutType[]>('SuggestWorkout').filtered(`level == '${level}'`).toJSON() as SuggestWorkoutType[]

        if (workouts.length < 1) {
            createSuggestsWorkouts().then(s => setSuggestsWorkouts(s))
            return
        }
        setSuggestsWorkouts(workouts.map(w => JSON.parse(w.workout)))
    }

    return (
        <SuggestWorkoutContext.Provider value={{ getSuggestsWorkouts, suggestsWorkouts }}>
            {children}
        </SuggestWorkoutContext.Provider>
    )
}

export default SuggestWorkoutProvider;