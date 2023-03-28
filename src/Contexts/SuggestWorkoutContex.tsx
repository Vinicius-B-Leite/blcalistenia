import React, { createContext, useEffect, useState } from 'react';
import { SuggestWorkoutType, WorkoutLevel } from '../models/SuggestsWorkoutType';
import { getRealm } from '../services/realm';
import { suggests } from '../utils/suggestsWorkout';
import { WorkoutType } from '../models/WorkoutType';
import { useRealm } from './RealmContext';


type SuggestsWorkoutContext = {
    getSuggestsWorkouts: (level: WorkoutLevel) => void,
    suggestsWorkouts: WorkoutType[]
}

type Props = {
    children: React.ReactNode
}

export const SuggestWorkoutContext = createContext({} as SuggestsWorkoutContext)

const SuggestWorkoutProvider: React.FC<Props> = ({ children }) => {

    const [suggestsWorkouts, setSuggestsWorkouts] = useState<WorkoutType[]>([])
    const { realm } = useRealm()

    const createSuggestsWorkouts = () => {
        if (realm) {
            
            let arraySuggests: SuggestWorkoutType[] = []

            suggests.forEach(w => {
                realm.write(() => {
                    let respose = realm.create<SuggestWorkoutType>('SuggestWorkout', {
                        id: w.id,
                        level: w.level,
                        workout: JSON.stringify(w.workout)
                    }).toJSON() as SuggestWorkoutType
                    arraySuggests.push(respose)
                })
            });

            let arraySuggestsWorkouts: WorkoutType[] = arraySuggests.map(s => JSON.parse(s.workout))
            return arraySuggestsWorkouts
        } else console.log('fsaaafasasf');


    }

    const getSuggestsWorkouts = (level: WorkoutLevel) => {

        if (realm) {
            const workouts = realm.objects<SuggestWorkoutType[]>('SuggestWorkout').filtered(`level == '${level}'`).toJSON() as SuggestWorkoutType[]

            console.log("🚀 ~ file: SuggestWorkoutContex.tsx:53 ~ getSuggestsWorkouts ~ workouts:", workouts)
            if (workouts.length < 1) {
                const sw = createSuggestsWorkouts()
                console.log("🚀 ~ file: SuggestWorkoutContex.tsx:55 ~ getSuggestsWorkouts ~ sw:", sw)

                sw && setSuggestsWorkouts(sw)
                return
            }
            setSuggestsWorkouts(workouts.map(w => JSON.parse(w.workout)))
        }
    }

    return (
        <SuggestWorkoutContext.Provider value={{ getSuggestsWorkouts, suggestsWorkouts }}>
            {children}
        </SuggestWorkoutContext.Provider>
    )
}

export default SuggestWorkoutProvider;