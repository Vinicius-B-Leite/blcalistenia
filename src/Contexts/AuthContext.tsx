import React, { createContext, useEffect, useState } from 'react';
import { UserType } from '../models/UserType';
import { getRealm } from '../services/realm';
import { useRealm } from './RealmContext';



type AuthContextType = {
    user: UserType,
    changePhoto: (uri: string) => void,
    changeName: (newName: string) => void
}

export const AuthContext = createContext({} as AuthContextType)


type Props = { children: React.ReactNode }

const AuthProvider: React.FC<Props> = ({ children }) => {
    const [user, setUser] = useState<UserType>({ username: 'Desconhecido', photoURI: 'https://pbs.twimg.com/media/FOq9YuBXsBgTIQM.jpg' })
    const { realm } = useRealm()
    useEffect(() => {
        getUser()
    }, [])

    const getUser = () => {
        if (realm) {


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


    }
    const changePhoto = (uri: string) => {
        if (uri.length > 0) {
            setUser(old => ({ ...old, photoURI: uri }))
            updateUserCache({ ...user, photoURI: uri })
        }
    }

    const updateUserCache = (newUser: UserType) => {
        if (realm) {

            realm.write(() => {
                realm.create<UserType>(
                    'User',
                    {
                        ...newUser
                    },
                    Realm.UpdateMode.Modified)
            })
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

export default AuthProvider;