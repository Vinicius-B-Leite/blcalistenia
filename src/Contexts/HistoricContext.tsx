import React, { createContext } from 'react';
import { HistoricType } from '../models/HistoricType'
import { getRealm } from '../services/realm';

type HistoricContextType = {
    getHistoric: () => Promise<HistoricType[]>
}
export const HistoricContext = createContext({} as HistoricContextType)


const HistoricProvider = ({ children }: { children: React.ReactNode }) => {

    const getHistoric = async () => {
        const realm = await getRealm()
        const historic = realm.objects('Historic').toJSON() as HistoricType[]
        return historic
    }

    return (
        <HistoricContext.Provider value={{ getHistoric }}>
            {children}
        </HistoricContext.Provider>
    )
}

export default HistoricProvider;