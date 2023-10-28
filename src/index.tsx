import React, { useContext } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { ThemeContext } from '@/contexts/ThemeContext';
import Routes from '@/routes';
import { darkMode } from '@/theme/darkMode';
import { lightMode } from '@/theme/lightMode';
import { UserProvider } from '@realm/react';
import { RealmProvider, syncConfig } from '@/services/realm/realm';
import { Provider } from 'react-redux';
import Login from '@/screens/Login';
import { store } from '@/features/store';




const Index: React.FC = () => {

    const { theme } = useContext(ThemeContext)

    return (
        <ThemeProvider theme={theme == 'dark' ? darkMode : lightMode}>
            <UserProvider fallback={<Login />}>
                <RealmProvider sync={syncConfig} >
                    <Provider store={store}>
                        <Routes />
                    </Provider>
                </RealmProvider>
            </UserProvider>
        </ThemeProvider>

    )
}

export default Index;