import { sizes } from "./sizes"

export const lightMode = {
    colors: {
        background: '#EBEBEB',
        text: '#000000',
        darkBackground: '#DCDCDC',
        darkBackgroundOpacity: 'rgba(167, 167, 167, 0.5)',
        contrast: '#6785F0',
        lightBackground: '#E2E2E2',
        darkText: '#262626',
        darkContrast: '#4B67C8',
        exrtemeDarkContrast: '#2E4186',
        alert: '#ff0000',
    },
    sizes: { ...sizes },
    name: 'light'
}