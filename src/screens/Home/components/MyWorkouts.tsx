import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import * as S from '../styles'
import { useTheme } from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { useRealm } from '../../../contexts/RealmContext';
import { RootState } from '../../../store';
import { setWorkoutList } from '../../../features/WorkoutList/workoutListSlicer';
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


const MyWorkouts: React.FC = () => {
    const theme = useTheme()
    const workoutList = useSelector((state: RootState) => state.workoutList.workouts)
    const { realm } = useRealm()
    const dispatch = useDispatch()

    const [searchWorkoutInput, setSearchWorkoutInput] = useState('')
    const searchWorkout = useMemo(() => {
        const workouts = realm?.objects('Workout').toJSON() as WorkoutType[]
        if (workouts) {
            return workouts.filter(val => val.title.toLocaleLowerCase().includes(searchWorkoutInput.toLocaleLowerCase()))
        }
    }, [searchWorkoutInput, realm])


    useFocusEffect(useCallback(() => {
        getWorkoutsList()
    }, [realm]))


    const getWorkoutsList = () => {
        if (realm) {
            let workouts = realm.objects('Workout').toJSON() as WorkoutType[]
            dispatch(setWorkoutList(workouts))
        }
    }


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
                data={searchWorkoutInput ? searchWorkout : workoutList}
                horizontal
                keyExtractor={(item) => item._id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    alignItems: 'center'
                }}
                ListEmptyComponent={() => <ListEmptyComponent />}
                ListHeaderComponent={() => <CreateWorkoutButton />}
                renderItem={({ item }) => <Workout data={item} />}
            />
        </S.WorkoutContainer>
    )
}

export default MyWorkouts;