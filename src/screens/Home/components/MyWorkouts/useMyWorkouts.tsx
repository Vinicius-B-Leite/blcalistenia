import {useQuery} from '@/services/realm/realm';
import {WorkoutType} from '@/models/WorkoutType';
import {useMemo, useState} from 'react';
import {useAppSelector} from '@/hooks/useAppSelector';
import {useGetWorkouts} from '../../../../domains/Workout/useCases/useGetWorkouts';

export default function useMyWorkouts() {
  const filteredWorkouts = useAppSelector(
    state => state.workoutList.filteredWorkouts,
  );

  const {workouts} = useGetWorkouts();

  const [searchWorkoutInput, setSearchWorkoutInput] = useState('');

  const searchWorkout = useMemo(() => {
    return workouts.filter(val =>
      val.title
        .toLocaleLowerCase()
        .includes(searchWorkoutInput.toLocaleLowerCase()),
    );
  }, [searchWorkoutInput]);

  const onChangeSearchWorkoutInput = (txt: string) => {
    setSearchWorkoutInput(txt);
  };

  return {
    filteredWorkouts,
    searchWorkoutInput,
    searchWorkout,
    onChangeSearchWorkoutInput,
    workouts,
  };
}
