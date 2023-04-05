import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import BackgroundService from 'react-native-background-actions';



type TimerContext = {
    timer: number
    stopTimer: () => void
    startTimer: () => void
    setTimer: React.Dispatch<React.SetStateAction<number>>

}

export const TimerContext = createContext({} as TimerContext)

type Props = {
    children: React.ReactNode
}
const TimerProvider: React.FC<Props> = ({ children }) => {
    const [timer, setTimer] = useState(-1)
    const options = {
        taskName: 'Cronometro',
        taskTitle: 'Volte ao treino',
        taskDesc: 'Tempo: ',
        taskIcon: {
            name: 'ic_launcher',
            type: 'mipmap',
        },
        color: '#FF8A00',
        linkingURI: 'blcalistenia://home/WorkoutSeason', // See Deep Linking for more info
    };

    const stopTimer = useCallback(async () => {
        await BackgroundService.stop()
    }, [])

    const sleep = (time: number) => new Promise<void>((resolve) => setTimeout(() => resolve(), time));

    const veryIntensiveTask = async () => {
        await new Promise(async (resolve) => {
            for (let i = 0; BackgroundService.isRunning(); i++) {
                setTimer(i)
                BackgroundService.updateNotification({
                    taskDesc: `Tempo atual: ${String(Math.floor(i / 60)).padStart(2, '0')}:${String(i % 60).padStart(2, '0')}`
                })
                await sleep(1000);
            }
        });
    };

    const startTimer = useCallback(async () => {
        await BackgroundService.start(veryIntensiveTask, options);
    }, [])

    return (
        <TimerContext.Provider value={{ stopTimer, timer, startTimer, setTimer }}>
            {children}
        </TimerContext.Provider>
    )
}
export const useTimer = () => useContext(TimerContext)
export default TimerProvider;