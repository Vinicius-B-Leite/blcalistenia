import {useEffect, useMemo, useState} from 'react';
import {useAppSelector} from '@/hooks';
import {useGetWorkouts} from '@/domains';
import {useDispatch} from 'react-redux';
import {setWorkouts} from '@/features';
import {useIsFocused} from '@react-navigation/native';

export default function useMyWorkouts(workoutName: string) {
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const filteredWorkouts = useAppSelector(
    state => state.workoutList.filteredWorkouts,
  );
  const muscleSelected = useAppSelector(
    state => state.workoutList.musclesSelected,
  );

  const workouts = useAppSelector(state => state.workoutList.workouts);
  const {workouts: workoutsStorage, fetchWorkouts} = useGetWorkouts();

  const searchWorkout = useMemo(() => {
    return workouts.filter(val =>
      val.title.toLocaleLowerCase().includes(workoutName.toLocaleLowerCase()),
    );
  }, [workoutName]);

  const workoutList = useMemo(() => {
    const isSearching = workoutName.length > 0;
    const isFiltering = muscleSelected.length > 0;

    if (isSearching) {
      return [...searchWorkout];
    }
    if (isFiltering) {
      return [...filteredWorkouts];
    }

    return [...workouts];
  }, [workoutName, filteredWorkouts, workoutsStorage, workouts]);

  useEffect(() => {
    if (!isFocus) return;
    fetchWorkouts();
  }, [isFocus]);

  useEffect(() => {
    dispatch(setWorkouts([...workoutsStorage]));
  }, [workoutsStorage]);
  return {
    workoutList,
  };
}
