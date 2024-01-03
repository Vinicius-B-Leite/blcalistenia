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

export const HistoricScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const {historic, refetchHistoric} = useGetHistoric();

  useFocusEffect(
    useCallback(() => {
      refetchHistoric();
    }, []),
  );

  const navigateToWorkout = (item: HistoricType) => {
    navigation.reset({
      index: 1,
      type: 'tab',
      routes: [
        {
          name: 'HomeStack',
          state: {
            index: 1,
            type: 'stack',
            routes: [
              {
                name: 'Home',
              },
              {
                name: 'Workout',
                params: {
                  workout: item.workout,
                  canEdit: false,
                },
              },
            ],
          },
        },
      ],
    });
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Container>
        <Header />

        <FlashList
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          estimatedItemSize={historic.length || 10}
          keyExtractor={item => String(item._id)}
          data={historic}
          renderItem={({item, index}) => (
            <Animated.View
              entering={FadeInDown.delay(index > 5 ? index * 400 : 1000)}>
              <HistoricItem item={item} onClick={navigateToWorkout} />
            </Animated.View>
          )}
        />
      </Container>
    </GestureHandlerRootView>
  );
};
