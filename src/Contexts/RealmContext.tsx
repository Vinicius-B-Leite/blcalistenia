import React, { createContext, useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { getRealm } from '../services/realm';


type RealmContextType = {
    realm: Realm | undefined
}
export const RealmContext = createContext({} as RealmContextType)


type Props = {
    children: React.ReactNode
}
const RealmProvider: React.FC<Props> = ({ children }) => {

    const [realm, setRealm] = useState<Realm | undefined>(undefined)

    useEffect(() => {
        getRealm().then((r) => setRealm(r)).catch((err) => console.log(err))
    }, [])


    return (
        <RealmContext.Provider
            value={{
                realm
            }}>
            {children}
        </RealmContext.Provider>
    )
}


export const useRealm = () => useContext(RealmContext)
export default RealmProvider;