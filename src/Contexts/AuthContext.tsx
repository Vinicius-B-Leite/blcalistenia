import React, { createContext, useState } from 'react';
import { View } from 'react-native';
import { UserType } from '../models/UserType';


type AuthContextType = {
    user: UserType,
    changePhoto: (uri: string) => void,
}

export const AuthContext = createContext({} as AuthContextType)


type Props = { children: React.ReactNode }

const AuthProvider: React.FC<Props> = ({ children }) => {
    const [user, setUser] = useState<UserType>({ username: 'Desconhecido', photoURI: 'https://pbs.twimg.com/media/FOq9YuBXsBgTIQM.jpg' })

    const changePhoto = (uri: string) => {
        setUser(old => ({...old, photoURI: uri}))
    }

    return (
        <AuthContext.Provider value={{ user, changePhoto }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;