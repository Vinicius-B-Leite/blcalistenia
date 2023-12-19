import {useEffect, useMemo, useState} from 'react';
import {useAppSelector} from '@/hooks/useAppSelector';
import {useGetWorkouts} from '../../../../domains/Workout/useCases/useGetWorkouts';
import {useDispatch} from 'react-redux';
import {setWorkouts} from '@/features/WorkoutList/workoutListSlicer';

export default function useMyWorkouts() {
  const dispatch = useDispatch();
  const filteredWorkouts = useAppSelector(
    state => state.workoutList.filteredWorkouts,
  );
  const muscleSelected = useAppSelector(
    state => state.workoutList.musclesSelected,
  );

  const workouts = useAppSelector(state => state.workoutList.workouts);
  const {workouts: workoutsStorage} = useGetWorkouts();
  const [searchWorkoutInput, setSearchWorkoutInput] = useState('');

  const searchWorkout = useMemo(() => {
    return workouts.filter(val =>
      val.title
        .toLocaleLowerCase()
        .includes(searchWorkoutInput.toLocaleLowerCase()),
    );
  }, [searchWorkoutInput]);

  const workoutList = useMemo(() => {
    const isSearching = searchWorkoutInput.length > 0;
    const isFiltering = muscleSelected.length > 0;

    if (isSearching) {
      return [...searchWorkout];
    }
    if (isFiltering) {
      return [...filteredWorkouts];
    }

    return [...workouts];
  }, [searchWorkoutInput, filteredWorkouts, workoutsStorage, workouts]);

  useEffect(() => {
    dispatch(setWorkouts([...workoutsStorage]));
  }, [workoutsStorage]);

  return {
    searchWorkoutInput,
    onChangeSearchWorkoutInput: setSearchWorkoutInput,
    workoutList,
  };
}
