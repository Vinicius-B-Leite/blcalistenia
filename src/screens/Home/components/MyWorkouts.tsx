import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import * as S from '../styles'
import { useTheme } from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../features/store';
import { WorkoutType } from '../../../models/WorkoutType';
import { muscles } from '../../../utils/muscles';
import Muscle from '../../../components/Muscle';
import ListEmptyComponent from '../../../components/ListEmptyComponent';
import CreateWorkoutButton from '../../../components/CreateWorkoutButton';
import Workout from '../../../components/Workout';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { ExerciseType } from '../../../models/ExerciseType';
import FilterMuscle from './FilterMuscle';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '../../../services/realm/realm';
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';


const MyWorkouts: React.FC = () => {
    const theme = useTheme()
    const filteredWorkouts = useSelector((state: RootState) => state.workoutList.filteredWorkouts)
    console.log("🚀 ~ file: MyWorkouts.tsx:24 ~ filteredWorkouts:", filteredWorkouts)
    const workoutsRealm = useQuery('Workout').toJSON() as WorkoutType[]
    const dispatch = useDispatch()


    const [searchWorkoutInput, setSearchWorkoutInput] = useState('')
    const searchWorkout = useMemo(() => {

        return workoutsRealm.filter(val => val.title.toLocaleLowerCase().includes(searchWorkoutInput.toLocaleLowerCase()))

    }, [searchWorkoutInput])

    return (
        <S.WorkoutContainer>
            <S.Title>Seus treinos</S.Title>
            <S.InputArea >
                <AntDesign name='search1' color={theme.colors.text} size={theme.sizes.icons.sm} />
                <S.Input
                    value={searchWorkoutInput}
                    onChangeText={setSearchWorkoutInput}
                    placeholder='Pesquisar treino'
                    placeholderTextColor={theme.colors.darkText}
                />
            </S.InputArea>

            <FilterMuscle />
            <S.WorkoutList
                data={searchWorkoutInput ? searchWorkout : filteredWorkouts ? filteredWorkouts : workoutsRealm}
                horizontal
                keyExtractor={(item) => item._id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    alignItems: 'center'
                }}
                ListEmptyComponent={() => <ListEmptyComponent />}
                ListHeaderComponent={() => <CreateWorkoutButton />}
                renderItem={({ item, index }) =>
                    <Animated.View entering={FadeInDown.delay(index * 400)} layout={Layout.springify()}>
                        <Workout data={item} />
                    </Animated.View>
                }
            />
        </S.WorkoutContainer>
    )
}

export default MyWorkouts;