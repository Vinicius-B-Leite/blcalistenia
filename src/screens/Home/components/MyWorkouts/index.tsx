import React from 'react';
import * as S from '../../styles';
import {useTheme} from 'styled-components/native';

import ListEmptyComponent from '@/screens/Home/components/MyWorkouts/ListEmptyComponent';
import CreateWorkoutButton from '@/screens/Home/components/MyWorkouts/CreateWorkoutButton';
import Workout from '@/screens/Home/components/Workout';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FilterMuscle from '../FilterMuscle';

import Animated, {FadeInDown, Layout} from 'react-native-reanimated';
import useMyWorkouts from './useMyWorkouts';
import {FlatList, Keyboard} from 'react-native';
import Box from '@/components/Box/Box';
import Text from '@/components/Text/Text';
import Input from '@/components/Input/Input';
import {useAppTheme} from '@/hooks/useAppTheme';

const MyWorkouts: React.FC = () => {
  const theme = useAppTheme();

  const {workoutList, onChangeSearchWorkoutInput, searchWorkoutInput} =
    useMyWorkouts();

  return (
    <Box marginVertical={24}>
      <Text preset="pLarge" bold color="contrast" mb={14}>
        Seus treinos
      </Text>

      <Input
        value={searchWorkoutInput}
        onChangeText={onChangeSearchWorkoutInput}
        placeholder="Pesquisar treino"
        onEndEditing={Keyboard.dismiss}
        leftIcon={
          <AntDesign name="search1" color={theme.colors.text} size={20} />
        }
      />

      <FilterMuscle />
      <FlatList
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
            <Workout workout={item} marginLeft={index === 0 ? 34 : undefined} />
          </Animated.View>
        )}
      />
    </Box>
  );
};

export default MyWorkouts;
