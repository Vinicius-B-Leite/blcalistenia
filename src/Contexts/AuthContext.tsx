import Realm from 'realm';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserType } from '../models/UserType';
import { useApp, useUser as useRealmUser } from '@realm/react';



type AuthContextType = {
    user: UserType,
    changePhoto: (uri: string) => void,
    changeName: (newName: string) => void
}

export const AuthContext = createContext({} as AuthContextType)


type Props = { children: React.ReactNode }

const AuthProvider: React.FC<Props> = ({ children }) => {
    const [user, setUser] = useState<UserType>({ _id: '', username: 'Desconhecido', photoURI: 'https://pbs.twimg.com/media/FOq9YuBXsBgTIQM.jpg' })
    const app = useApp()
    const userRealm = useRealmUser()
    const realm: Realm | undefined = undefined

   



    const changePhoto = (uri: string) => {
        if (uri.length > 0) {
            setUser(old => ({ ...old, photoURI: uri }))
            updateUserCache({ ...user, photoURI: uri })
        }
    }

    const updateUserCache = (newUser: UserType) => {
        if (realm) {

            // realm.write(() => {
            //     realm.create<UserType>(
            //         'User',
            //         {
            //             ...newUser
            //         },
            //         Realm.UpdateMode.Modified)
            // })
        }
    }

    const changeName = (newName: string) => {
        if (newName.length > 0) {
            setUser(old => ({ ...old, username: newName }))
            updateUserCache({ ...user, username: newName })
        }
    }


    return (
        <AuthContext.Provider value={{ user, changePhoto, changeName }}>
            {children}
        </AuthContext.Provider>
    )
}


export const useUser = () => useContext(AuthContext)
export default AuthProvider;