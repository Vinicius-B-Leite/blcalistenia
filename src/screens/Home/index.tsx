import React, { useCallback, useEffect, useRef } from 'react';
import Container from '../../components/Container';
import { View } from 'react-native'
import CalendarDaysTrained, { CalendarRef } from '../../components/CalendarDaysTrained';
import GoBackToWorkout from '../../components/GoBackToWorkout';
import Header from './components/Header'
import WorkoutSuggest from './components/WorkoutSuggest';
import MyWorkouts from './components/MyWorkouts';
import { useApp, useUser } from '@realm/react';
import { useRealm } from '../../services/realm/realm';
import { addSubs } from '../../services/realm/subscription';





const Home: React.FC = () => {

    const calendarRef = useRef<CalendarRef>(null)
    const user = useUser()
    const realm = useRealm()
    const app = useApp()



    useEffect(() => {
        if (app.currentUser?.isLoggedIn) {
            addSubs(realm, user.id)
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