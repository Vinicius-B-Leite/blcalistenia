import React from 'react';
import * as S from '../../styles';
import {useTheme} from 'styled-components/native';

import ListEmptyComponent from '@/screens/Home/components/MyWorkouts/ListEmptyComponent';
import CreateWorkoutButton from '@/screens/Home/components/MyWorkouts/CreateWorkoutButton';
import Workout from '@/components/Workout';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FilterMuscle from '../FilterMuscle';

import Animated, {FadeInDown, Layout} from 'react-native-reanimated';
import useMyWorkouts from './useMyWorkouts';
import {Keyboard} from 'react-native';

const MyWorkouts: React.FC = () => {
  const theme = useTheme();

  const {workoutList, onChangeSearchWorkoutInput, searchWorkoutInput} =
    useMyWorkouts();

  return (
    <S.WorkoutContainer>
      <S.Title>Seus treinos</S.Title>
      <S.InputArea>
        <AntDesign
          name="search1"
          color={theme.colors.text}
          size={theme.sizes.icons.sm}
        />
        <S.Input
          value={searchWorkoutInput}
          onChangeText={onChangeSearchWorkoutInput}
          placeholder="Pesquisar treino"
          placeholderTextColor={theme.colors.darkText}
          onEndEditing={Keyboard.dismiss}
        />
      </S.InputArea>

      <FilterMuscle />
      <S.WorkoutList
        data={workoutList}
        horizontal
        keyExtractor={item => item._id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        ListEmptyComponent={() => <ListEmptyComponent />}
        ListHeaderComponent={() => <CreateWorkoutButton />}
        renderItem={({item, index}) => (
          <Animated.View
            entering={FadeInDown.delay(index * 400)}
            layout={Layout.springify()}>
            <Workout workout={item} />
          </Animated.View>
        )}
      />
    </S.WorkoutContainer>
  );
};

export default MyWorkouts;
