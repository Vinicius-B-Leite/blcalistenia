import React, {useCallback, useRef, useState} from 'react';
import * as S from './styles';
import {HistoricType} from '@/models/HistoricType';
import HistoricItem from '@/components/HistoricItem';
import BottomSheet, {BottomSheetRefProps} from '@/components/BottomSheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {FlashList} from '@shopify/flash-list';
import {HistoricBS} from './components/HistoricBS';

import Animated, {FadeInDown} from 'react-native-reanimated';
import {useGetHistoric} from '../../domains/Historic/useCases/useGetHistoric';
import {useFocusEffect} from '@react-navigation/native';

const Historic: React.FC = () => {
  const bottomsheetRef = useRef<BottomSheetRefProps>(null);
  const [bottomSheetItem, setBottomSheetItem] = useState<HistoricType | null>(
    null,
  );

  const {historic, fetchHistoric} = useGetHistoric();

  useFocusEffect(
    useCallback(() => {
      fetchHistoric();
    }, []),
  );

  return (
    <GestureHandlerRootView style={{flex: 1}}>
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
            renderItem={({item, index}) => (
              <Animated.View entering={FadeInDown.delay(index * 400)}>
                <HistoricItem
                  item={item}
                  onClick={bsItem => {
                    setBottomSheetItem(bsItem);
                    bottomsheetRef.current?.scrollTo({
                      destination: 200,
                      duration: 1000,
                    });
                  }}
                />
              </Animated.View>
            )}
          />
        </S.HistoricListContainer>

        <BottomSheet
          onClose={() => setBottomSheetItem(null)}
          ref={bottomsheetRef}>
          <HistoricBS
            timerInSeconds={bottomSheetItem?.timerInSeconds}
            workout={JSON.parse(bottomSheetItem?.workout || '{}')}
          />
        </BottomSheet>
      </S.Container>
    </GestureHandlerRootView>
  );
};
export default Historic;
