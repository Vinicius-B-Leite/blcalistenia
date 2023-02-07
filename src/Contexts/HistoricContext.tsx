import React, { createContext } from 'react';
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';
import { MarkedDates } from 'react-native-calendars/src/types'
import { HistoricType } from '../models/HistoricType'
import { getRealm } from '../services/realm';

type HistoricContextType = {
    getHistoric: () => Promise<HistoricType[]>,
    getDatesTrained: (config: MarkingProps) => Promise<MarkedDates>
}
export const HistoricContext = createContext({} as HistoricContextType)


const HistoricProvider = ({ children }: { children: React.ReactNode }) => {

    const getHistoric = async () => {
        const realm = await getRealm()
        const historic = realm.objects('Historic').toJSON() as HistoricType[]
        return historic
    }

    const getDatesTrained = async (config: MarkingProps) => {
        const historics = await getHistoric()
        const dates = historics.map(h => h.date)

        let datesConfigureds: MarkedDates = {}

        dates.forEach(d => {
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
            datesConfigureds[key] = config
        })


        return datesConfigureds
    }

    return (
        <HistoricContext.Provider value={{ getHistoric, getDatesTrained }}>
            {children}
        </HistoricContext.Provider>
    )
}

export default HistoricProvider;