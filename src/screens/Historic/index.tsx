import React, { useRef, useState } from 'react';
import * as S from './styles'
import { HistoricType } from '../../models/HistoricType';
import HistoricItem from '../../components/HistoricItem';
import BottomSheet, { BottomSheetRefProps } from '../../components/BottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FlashList } from '@shopify/flash-list';
import { HistoricBS } from './components/HistoricBS';
import { useQuery } from '../../services/realm/realm';
import Animated, { FadeInDown } from 'react-native-reanimated';



const Historic: React.FC = () => {
    const bottomsheetRef = useRef<BottomSheetRefProps>(null)
    const [bottomSheetItem, setBottomSheetItem] = useState<HistoricType | null>(null)
    const historics = useQuery('Historic').sorted('date', true).toJSON() as HistoricType[]


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
                        estimatedItemSize={historics.length || 10}
                        keyExtractor={item => String(item._id)}
                        data={historics}
                        renderItem={({ item, index }) =>
                            <Animated.View entering={FadeInDown.delay(index * 400)}>
                                <HistoricItem
                                    item={item}
                                    onClick={(bsItem) => {
                                        setBottomSheetItem(bsItem)
                                        bottomsheetRef.current?.scrollTo({ destination: 200, duration: 1000 })
                                    }} />
                            </Animated.View>
                        }
                    />
                </S.HistoricListContainer>

                <BottomSheet onClose={() => setBottomSheetItem(null)} ref={bottomsheetRef} >
                    <HistoricBS item={bottomSheetItem} />
                </BottomSheet>

            </S.Container>
        </GestureHandlerRootView>

    )
}
export default Historic;