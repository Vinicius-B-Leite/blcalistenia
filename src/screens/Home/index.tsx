import React, { useEffect, useRef } from 'react';
import CalendarDaysTrained, { CalendarRef } from '../../components/CalendarDaysTrained';
import GoBackToWorkout from '../../components/GoBackToWorkout';
import Header from './components/Header'
import WorkoutSuggest from './components/WorkoutSuggest';
import MyWorkouts from './components/MyWorkouts';
import { useApp, useUser } from '@realm/react';
import { useRealm } from '@/services/realm/realm';
import { addSubs } from '../../services/realm/subscription';
import { View } from 'react-native';





const Home: React.FC = () => {

    const calendarRef = useRef<CalendarRef>(null)
    const user = useUser()
    const realm = useRealm()
    const app = useApp()



    useEffect(() => {
        const isUserLogged = app.currentUser?.isLoggedIn
        if (isUserLogged) {
            addSubs(realm, user.id)
        }
    }, [realm])



    return (
        <>
            <View style={{ flex: 1 }}>
                <CalendarDaysTrained ref={calendarRef} />
                <Header openCalendar={() => calendarRef.current?.openCalendar()} />

                <MyWorkouts />

                <WorkoutSuggest />
            </View>
            <GoBackToWorkout />
        </>
    )
}

export default Home;