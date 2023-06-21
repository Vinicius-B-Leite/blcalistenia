import React, { useState, useCallback, useEffect, useRef } from 'react';
import Container from '../../components/Container';
import * as S from './styles'
import { View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useTheme } from 'styled-components/native';
import { muscles } from '../../utils/muscles';
import Muscle from '../../components/Muscle';
import CreateWorkoutButton from '../../components/CreateWorkoutButton';
import Workout from '../../components/Workout';
import { useNavigation } from '@react-navigation/native';
import CalendarDaysTrained, { CalendarRef } from '../../components/CalendarDaysTrained';
import { RootStackParamList } from '../../routes/Models';
import { StackNavigationProp } from '@react-navigation/stack';
import ListEmptyComponent from '../../components/ListEmptyComponent';
import { SuggestWorkoutType, WorkoutLevel } from '../../models/SuggestsWorkoutType';
import { useRealm } from '../../contexts/RealmContext';
import { useUser } from '../../contexts/AuthContext';
import { WorkoutType } from '../../models/WorkoutType';
import { ExerciseType } from '../../models/ExerciseType';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store';
import { setWorkoutList } from '../../features/WorkoutList/workoutListSlicer'
import { suggests } from '../../utils/suggestsWorkout';
import GoBackToWorkout from '../../components/GoBackToWorkout';
import Header from './components/Header'
import WorkoutSuggest from './components/WorkoutSuggest';
import MyWorkouts from './components/MyWorkouts';

type Navigation = StackNavigationProp<RootStackParamList, 'Home'>



const Home: React.FC = () => {

    const calendarRef = useRef<CalendarRef>(null)

    return (
        <View style={{ flex: 1 }}>
            <Container>
                <CalendarDaysTrained ref={calendarRef} />
                <Header openCalendar={() => calendarRef.current?.openCalendar()} />

                <MyWorkouts />

                <WorkoutSuggest />
            </Container>
            <GoBackToWorkout />
        </View>
    )
}

export default Home;