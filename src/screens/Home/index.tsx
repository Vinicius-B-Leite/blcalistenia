import React, { useState, useCallback, useEffect, useRef } from 'react';
import Container from '../../components/Container';
import Realm from "realm";
import * as S from './styles'
import { View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useTheme } from 'styled-components/native';
import { muscles } from '../../utils/muscles';
import Muscle from '../../components/Muscle';
import CreateWorkoutButton from '../../components/CreateWorkoutButton';
import Workout from '../../components/Workout';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CalendarDaysTrained, { CalendarRef } from '../../components/CalendarDaysTrained';
import { RootStackParamList } from '../../routes/Models';
import { StackNavigationProp } from '@react-navigation/stack';
import ListEmptyComponent from '../../components/ListEmptyComponent';
import { SuggestWorkoutType, WorkoutLevel } from '../../models/SuggestsWorkoutType';
import { WorkoutType } from '../../models/WorkoutType';
import { ExerciseType } from '../../models/ExerciseType';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../features/store';
import { setWorkoutList } from '../../features/WorkoutList/workoutListSlicer'
import { suggests } from '../../utils/suggestsWorkout';
import GoBackToWorkout from '../../components/GoBackToWorkout';
import Header from './components/Header'
import WorkoutSuggest from './components/WorkoutSuggest';
import MyWorkouts from './components/MyWorkouts';
import { useApp, useUser } from '@realm/react';
import { useRealm } from '../../services/realm';
import { initialsExercises } from '../../utils/initialsExercises';

type Navigation = StackNavigationProp<RootStackParamList, 'Home'>



const Home: React.FC = () => {

    const calendarRef = useRef<CalendarRef>(null)
    const user = useUser()
    const realm = useRealm()
    const app = useApp()


    const addSubs = async () => {
        console.log('chamou o sub')
         await realm.subscriptions.update((sub, realm) => {
            const historicToSync = realm.objects('Historic').filtered(`user_id == '${user.id}'`)
            const workoutToSync = realm.objects('Workout').filtered(`user_id == '${user.id}'`)
            const exercisesToSync = realm.objects('Exercise').filtered(`user_id == '${user.id}'`)

            sub.add(historicToSync, { name: 'historic-Teste' })
            sub.add(exercisesToSync, { name: 'exercises-Teste' })
            sub.add(workoutToSync, { name: 'Workout-TEste' })
        })
    }

    useEffect(() => {
        if (app.currentUser?.isLoggedIn) {
            addSubs()
        }
    }, [realm])

    useFocusEffect(useCallback(() => {

        console.log('subs state => ' + realm.subscriptions.state)
        console.log('user.id => ' + user.id)
        console.log('async state => ' + realm.syncSession?.connectionState)

    }, []))

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