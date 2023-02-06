import React, { useContext, useEffect, useState } from 'react';
import { FlatList } from 'react-native'
import * as S from './styles'
import { HistoricContext } from '../../contexts/HistoricContext';
import { HistoricType } from '../../models/HistoricType';
import HistoricItem from '../../components/HistoricItem';


const Historic: React.FC = () => {
    const { getHistoric } = useContext(HistoricContext)
    const [historic, setHistoric] = useState<HistoricType[]>([])

    useEffect(() => {
        getHistoric().then(realmHistoric => setHistoric(realmHistoric))
    }, [])

    return (
        <S.Container>
            <S.Header>
                <S.Title>Histórico</S.Title>
                <S.FilterButton>
                    <S.FilterText>data</S.FilterText>
                </S.FilterButton>
            </S.Header>
            <FlatList
                contentContainerStyle={{padding: '5%'}}
                data={historic}
                renderItem={({item}) => <HistoricItem item={item} />}
            />

        </S.Container>
    )
}

export default Historic;