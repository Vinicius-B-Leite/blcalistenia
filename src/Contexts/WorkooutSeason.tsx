import React, { createContext, useState } from 'react';


type WorkoutSeasonType = {
    timer: number
}

export const WorkoutSeasonContext = createContext({} as WorkoutSeasonType)


const WorkoutSeasonProvider = ({ children }: { children: React.ReactNode }) => {
    const [timer, setTimer] = useState(0)


    return (
        <WorkoutSeasonContext.Provider value={{ timer }}>
            {children}
        </WorkoutSeasonContext.Provider>
    )
}

export default WorkoutSeasonProvider;