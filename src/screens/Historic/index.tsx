import React, {useCallback} from 'react';

import {HistoricType} from '@/models/HistoricType';
import HistoricItem from './components/HistoricItem';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {FlashList} from '@shopify/flash-list';

import Animated, {FadeInDown} from 'react-native-reanimated';
import {useGetHistoric} from '@/domains';
import {useFocusEffect} from '@react-navigation/native';
import {Container} from '@/components';
import Header from './components/Header/Header';
import {useAppNavigation} from '@/hooks';

export const Historic: React.FC = () => {
  const navigation = useAppNavigation();
  const {historic, fetchHistoric} = useGetHistoric();

  useFocusEffect(
    useCallback(() => {
      fetchHistoric();
    }, []),
  );

  const navigateToWorkout = (item: HistoricType) => {
    navigation.navigate('HomeStack', {
      screen: 'Workout',
      params: JSON.parse(item.workout),
    });
  };

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
