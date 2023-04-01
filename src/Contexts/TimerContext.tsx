import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { View } from 'react-native';



type TimerContext = {
    timer: number
    stopTimer: () => void
    startTimer: () => void
}

export const TimerContext = createContext({} as TimerContext)

type Props = {
    children: React.ReactNode
}
const TimerProvider: React.FC<Props> = ({ children }) => {
    const [timer, setTimer] = useState(-1)
    const [stop, setStop] = useState(true)

    useEffect(() => {
        if (!stop) {
            setTimeout(() => {
                setTimer(old => old + 1)
            }, 1000)
        }
    }, [timer, stop])

    const stopTimer = useCallback(() => {
        setStop(true)
    }, [])

    const startTimer = useCallback(() => {
        setStop(false)
    }, [])

    return (
        <TimerContext.Provider value={{ stopTimer, timer , startTimer}}>
            {children}
        </TimerContext.Provider>
    )
}
export const useTimer = () => useContext(TimerContext)
export default TimerProvider;