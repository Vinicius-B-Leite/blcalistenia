import React, { createContext, useEffect, useState } from 'react';
import { User } from 'realm';
import { UserType } from '../models/UserType';
import { WorkoutType } from '../models/WorkoutType';
import { getRealm } from '../services/realm';



type AuthContextType = {
    user: UserType,
    changePhoto: (uri: string) => Promise<void>,
    changeName: (newName: string) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)


type Props = { children: React.ReactNode }

const AuthProvider: React.FC<Props> = ({ children }) => {
    const [user, setUser] = useState<UserType>({ username: 'Desconhecido', photoURI: 'https://pbs.twimg.com/media/FOq9YuBXsBgTIQM.jpg' })

    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        const realm = await getRealm()

        const userRealm = realm.objects('User')[0]

        if (typeof userRealm === 'undefined') {
            realm.write(() => {
                realm.create<UserType>('User', {
                    username: 'Desconhecido',
                    photoURI: 'https://pbs.twimg.com/media/FOq9YuBXsBgTIQM.jpg'
                })
            })
        } else {
            setUser(userRealm.toJSON() as UserType)
        }


    }
    const changePhoto = async (uri: string) => {
        if (uri.length > 0) {
            setUser(old => ({ ...old, photoURI: uri }))
            await updateUserCache({ ...user, photoURI: uri })
        }
    }

    const updateUserCache = async (newUser: UserType) => {
        const realm = await getRealm()
        realm.write(() => {
            realm.create<UserType>(
                'User',
                {
                    ...newUser
                },
                Realm.UpdateMode.Modified)
        })
    }

    const changeName = async (newName: string) => {
        if (newName.length > 0) {
            setUser(old => ({ ...old, username: newName }))
            await updateUserCache({ ...user, username: newName })
        }
    }


    return (
        <AuthContext.Provider value={{ user, changePhoto, changeName }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;