import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import BackgroundService from 'react-native-background-actions';



type TimerContext = {
    timer: number
    startTimer: () => Promise<void>
    setTimer: React.Dispatch<React.SetStateAction<number>>
    stopBGTimer: () => Promise<void>
}

export const TimerContext = createContext({} as TimerContext)

type Props = {
    children: React.ReactNode
}

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
const TimerProvider: React.FC<Props> = ({ children }) => {
    const [timer, setTimer] = useState(-1)

    const sleep = (time: number) => new Promise<void>((resolve) => setTimeout(() => resolve(), time));

    const stopBGTimer = async () => {
        await BackgroundService.stop()
        setTimer(-1)
    }
    const veryIntensiveTask = async () => {
        if (timer > -1) return
        console.log('veryIntensiveTask called')
        await new Promise(async (resolve) => {
            for (let i = 0; BackgroundService.isRunning(); i++) {

                console.log('timer is running')
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
        <TimerContext.Provider value={{ timer, startTimer, setTimer, stopBGTimer }}>
            {children}
        </TimerContext.Provider>
    )
}
export const useTimer = () => useContext(TimerContext)
export default TimerProvider;