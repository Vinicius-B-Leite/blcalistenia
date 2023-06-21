import React, { useContext } from 'react';
import { View } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import AuthProvider from './contexts/AuthContext';
import { ThemeContext } from './contexts/ThemeContext';
import Routes from './routes';
import { darkMode } from './theme/darkMode';
import { lightMode } from './theme/lightMode';


const Index: React.FC = () => {

    const { theme } = useContext(ThemeContext)

    return (
        <ThemeProvider theme={theme == 'dark' ? darkMode : lightMode}>
            <AuthProvider>
                    <Routes />
            </AuthProvider>
        </ThemeProvider>
    )
}

export default Index;