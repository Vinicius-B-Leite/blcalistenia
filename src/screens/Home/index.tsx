import React, {  useCallback, useEffect, useRef } from 'react';
import Container from '../../components/Container';
import { View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import CalendarDaysTrained, { CalendarRef } from '../../components/CalendarDaysTrained';
import { RootStackParamList } from '../../routes/Models';
import { StackNavigationProp } from '@react-navigation/stack';
import GoBackToWorkout from '../../components/GoBackToWorkout';
import Header from './components/Header'
import WorkoutSuggest from './components/WorkoutSuggest';
import MyWorkouts from './components/MyWorkouts';
import { useApp, useUser } from '@realm/react';
import { useRealm } from '../../services/realm';




const Home: React.FC = () => {

    const calendarRef = useRef<CalendarRef>(null)
    const user = useUser()
    const realm = useRealm()
    const app = useApp()


    const addSubs = async () => {
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