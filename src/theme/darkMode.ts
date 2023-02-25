import { Dimensions } from 'react-native'
import { sizes } from './sizes'

export const darkMode = {
    colors: {
        background: '#1a1a1a',
        text: '#fff',
        darkBackground: '#0f0f0f',
        darkBackgroundOpacity: 'rgba(15, 15, 15, 0.5)',
        contrast: '#FF8A00',
        lightBackground: '#252525',
        darkText: '#6b6b6b',
        darkContrast: '#8A4C04',
        exrtemeDarkContrast: '#703e03',
        alert: '#ff0000',
    },
    sizes: { ...sizes },
    name: 'dark'
}