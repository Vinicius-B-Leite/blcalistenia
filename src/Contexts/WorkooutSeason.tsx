import React, { createContext, useEffect, useState, useCallback } from 'react';
import { ExercisesInWorkoutType } from '../models/ExercisesInWorkoutType';
import { HistoricType } from '../models/HistoricType';
import { SerieType } from '../models/SerieType';
import { WorkoutType } from '../models/WorkoutType';
import { getRealm } from '../services/realm';
import { useRealm } from './RealmContext';

type WorkoutSeasonType = {
    workoutCopy: WorkoutType | undefined,
    setWorkoutCopy: React.Dispatch<React.SetStateAction<WorkoutType | undefined>>
}

export const WorkoutSeasonContext = createContext({} as WorkoutSeasonType)




const WorkoutSeasonProvider = ({ children }: { children: React.ReactNode }) => {

    const [workoutCopy, setWorkoutCopy] = useState<WorkoutType>()


    return (
        <WorkoutSeasonContext.Provider value={{
            workoutCopy,
            setWorkoutCopy
        }}>
            {children}
        </WorkoutSeasonContext.Provider>
    )
}

export default WorkoutSeasonProvider;

