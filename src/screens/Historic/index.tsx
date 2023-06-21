import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as S from './styles'
import { HistoricType } from '../../models/HistoricType';
import HistoricItem from '../../components/HistoricItem';
import BottomSheet, { BottomSheetRefProps } from '../../components/BottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { useRealm } from '../../contexts/RealmContext';
import { TabParamList } from '../../routes/Models';
import { HistoricBS } from './components/HistoricBS';


type Nav = NavigationProp<TabParamList, 'Historic'>

const Historic: React.FC = () => {
    const [historic, setHistoric] = useState<HistoricType[]>([])
    const bottomsheetRef = useRef<BottomSheetRefProps>(null)
    const [bottomSheetItem, setBottomSheetItem] = useState<HistoricType | null>(null)
    const { realm } = useRealm()
    const navigation = useNavigation<Nav>()


    const getHistoric = () => {
        if (realm) {
            const historic = realm.objects('Historic').sorted('date', true).toJSON() as HistoricType[]
            setHistoric(historic)
        }
    }
    useFocusEffect(useCallback(() => {
        getHistoric()
    }, [realm]))


    


    return (
        <GestureHandlerRootView style={{ flex: 1 }} >
            <S.Container>
                <S.Header>
                    <S.Title>Histórico</S.Title>
                    <S.FilterButton>
                        <S.FilterText>data</S.FilterText>
                    </S.FilterButton>
                </S.Header>
                <S.HistoricListContainer>
                    <FlashList
                        nestedScrollEnabled
                        estimatedItemSize={historic.length || 10}
                        keyExtractor={item => String(item._id)}
                        data={historic}
                        renderItem={({ item }) => <HistoricItem
                            item={item}
                            onClick={(bsItem) => {
                                setBottomSheetItem(bsItem)
                                bottomsheetRef.current?.scrollTo({ destination: 200, duration: 1000 })
                            }} />}
                    />
                </S.HistoricListContainer>
                {
                    bottomSheetItem &&
                    <BottomSheet onClose={() => setBottomSheetItem(null)} ref={bottomsheetRef} >
                        <HistoricBS item={bottomSheetItem} />
                    </BottomSheet>
                }
            </S.Container>
        </GestureHandlerRootView>

    )
}
export default Historic;