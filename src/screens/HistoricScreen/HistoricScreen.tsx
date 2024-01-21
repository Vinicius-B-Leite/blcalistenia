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
import {useAppNavigation, useAppSelector} from '@/hooks';
import Toast from 'react-native-toast-message';

export const HistoricScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const {historic, refetchHistoric} = useGetHistoric();
  const isWorkingout = useAppSelector(state => state.workout.isWorkingout);
  useFocusEffect(
    useCallback(() => {
      refetchHistoric();
    }, []),
  );

  const navigateToWorkout = (item: HistoricType) => {
    if (isWorkingout) {
      Toast.show({
        type: 'error',
        props: {message: 'Termine seu treino para ver o histórico'},
      });
      return;
    }
    navigation.navigate('HomeStack', {
      screen: 'Workout',
      initial: true,
      params: {
        canEdit: false,
        workout: item.workout,
      },
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
            <Animated.View entering={FadeInDown.delay(index * 100)}>
              <HistoricItem item={item} onClick={navigateToWorkout} />
            </Animated.View>
          )}
        />
      </Container>
    </GestureHandlerRootView>
  );
};
