import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeType = 'dark' | 'light'

type ThemeContextType = {
    toggleTheme: (theme: ThemeType) => void,
    theme: ThemeType
}

export const ThemeContext = createContext({} as ThemeContextType)

const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [theme, setTheme] = useState<ThemeType>('dark')

    useEffect(() => {
        getTheme()
    }, [])
    
    const toggleTheme = async (theme: ThemeType) => {
        if (theme == 'dark') {
            setTheme('dark')
            await AsyncStorage.setItem('_theme', 'dark')
        }
        else {
            setTheme('light')
            await AsyncStorage.setItem('_theme', 'light')
        }
    }

    const getTheme =async () => {
        const asyncTheme = await AsyncStorage.getItem('_theme')
        if (!asyncTheme) {
            await AsyncStorage.setItem('_theme', theme)
            return
        }
        setTheme(asyncTheme as ThemeType)
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )



}

export default ThemeContextProvider;