import React, { createContext, useEffect, useState, useCallback } from 'react';
import { ExercisesInWorkoutType } from '../models/ExercisesInWorkoutType';
import { HistoricType } from '../models/HistoricType';
import { SerieType } from '../models/SerieType';
import { WorkoutType } from '../models/WorkoutType';
import { getRealm } from '../services/realm';
import { useRealm } from './RealmContext';

type WorkoutSeasonType = {
    workoutCopy: WorkoutType | undefined,
    timer: number,
    setWorkoutCopy: React.Dispatch<React.SetStateAction<WorkoutType | undefined>>
    setTimer: React.Dispatch<React.SetStateAction<number>>
}

export const WorkoutSeasonContext = createContext({} as WorkoutSeasonType)




const WorkoutSeasonProvider = ({ children }: { children: React.ReactNode }) => {

    const [workoutCopy, setWorkoutCopy] = useState<WorkoutType>()
    const [timer, setTimer] = useState(-1)

    useEffect(() => {
        if (workoutCopy) {
            setTimeout(() => {
                setTimer(old => old + 1)
            }, 1000)
        }
    }, [timer])

    
    return (
        <WorkoutSeasonContext.Provider value={{
            workoutCopy,
            timer,
            setTimer,
            setWorkoutCopy
        }}>
            {children}
        </WorkoutSeasonContext.Provider>
    )
}

export default WorkoutSeasonProvider;

