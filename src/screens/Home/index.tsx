import React, {useRef} from 'react';
import CalendarDaysTrained, {
  CalendarRef,
} from '../../components/CalendarDaysTrained';
import GoBackToWorkout from '../../components/GoBackToWorkout';
import Header from './components/Header';
import WorkoutSuggest from './components/WorkoutSuggest';
import MyWorkouts from './components/MyWorkouts';

import {View} from 'react-native';
import Container from '@/components/Container/Container';

const Home: React.FC = () => {
  const calendarRef = useRef<CalendarRef>(null);

  return (
    <>
      <Container>
        <CalendarDaysTrained ref={calendarRef} />
        <Header openCalendar={() => calendarRef.current?.openCalendar()} />

        <MyWorkouts />

        <WorkoutSuggest />
      </Container>
      <GoBackToWorkout />
    </>
  );
};

export default Home;
