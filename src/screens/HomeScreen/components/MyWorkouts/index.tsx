import React from 'react';

import ListEmptyComponent from '@/screens/HomeScreen/components/MyWorkouts/ListEmptyComponent';
import CreateWorkoutButton from '@/screens/HomeScreen/components/MyWorkouts/CreateWorkoutButton';
import Workout from '@/screens/HomeScreen/components/Workout';
import FilterMuscle from '../FilterMuscle';

import Animated, {FadeInDown, Layout} from 'react-native-reanimated';
import useMyWorkouts from './useMyWorkouts';
import {FlatList, Keyboard} from 'react-native';

import {Input, Text, Box, Icon, FormInput} from '@/components';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {SearchWorkoutSchema, searchWorkoutSchema} from './schema';

const MyWorkouts: React.FC = () => {
  const {control, watch} = useForm<SearchWorkoutSchema>({
    resolver: zodResolver(searchWorkoutSchema),
    defaultValues: {
      workoutName: '',
    },
  });

  const {workoutList} = useMyWorkouts(watch('workoutName'));

  return (
    <Box marginVertical={24}>
      <Text preset="pLarge" bold color="contrast" mb={14}>
        Seus treinos
      </Text>

      <FormInput
        name={'workoutName'}
        control={control}
        placeholder="Pesquisar treino"
        onEndEditing={Keyboard.dismiss}
        leftIcon={
          <Icon name="search1" color={'text'} size={18} family="AntDesign" />
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
            entering={FadeInDown.delay(index > 5 ? index * 400 : 1000)}
            layout={Layout.springify()}>
            <Workout workout={item} marginLeft={index === 0 ? 34 : undefined} />
          </Animated.View>
        )}
      />
    </Box>
  );
};

export default MyWorkouts;
