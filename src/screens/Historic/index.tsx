import React, {useCallback, useRef, useState} from 'react';
import * as S from './styles';
import {HistoricType} from '@/models/HistoricType';
import HistoricItem from '@/screens/Historic/components/HistoricItem';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {FlashList} from '@shopify/flash-list';

import Animated, {FadeInDown} from 'react-native-reanimated';
import {useGetHistoric} from '../../domains/Historic/useCases/useGetHistoric';
import {useFocusEffect} from '@react-navigation/native';
import Container from '@/components/Container/Container';
import Header from './components/Header/Header';

const Historic: React.FC = () => {
  const {historic, fetchHistoric} = useGetHistoric();

  useFocusEffect(
    useCallback(() => {
      fetchHistoric();
    }, []),
  );

  const navigateToWorkout = (item: HistoricType) => {};

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Container>
        <Header />

        <FlashList
          nestedScrollEnabled
          estimatedItemSize={historic.length || 10}
          keyExtractor={item => String(item._id)}
          data={historic}
          renderItem={({item, index}) => (
            <Animated.View entering={FadeInDown.delay(index * 400)}>
              <HistoricItem item={item} onClick={navigateToWorkout} />
            </Animated.View>
          )}
        />
      </Container>
    </GestureHandlerRootView>
  );
};
export default Historic;
