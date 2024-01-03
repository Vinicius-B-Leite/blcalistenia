import {WorkoutType} from '@/models/WorkoutType';

import {useDispatch} from 'react-redux';
import {
  cancelFilteredWorkout,
  filteredWorkouts,
  setMuscleSelected,
} from '@/features';

import {initialsExercises} from '@/constants';
import {useGetWorkouts, useGetExercises} from '@/domains';

import {useAppSelector} from '@/hooks';

export default function useFilterMuscle() {
  const dispatch = useDispatch();
  const {workouts} = useGetWorkouts();
  const {exercises} = useGetExercises();
  const muscleFilterSelected = useAppSelector(
    state => state.workoutList.musclesSelected,
  );

  const filterWorkoutsByMuscle = (muscle: string) => {
    if (muscleFilterSelected === muscle) {
      dispatch(cancelFilteredWorkout());
      dispatch(setMuscleSelected(''));
      return;
    }
    dispatch(setMuscleSelected(muscle));

    const exercisesHaveMuscleSelected = [
      ...exercises.filter(e => e.muscles.includes(muscle.toLowerCase())),
    ];

    let workoutsWithMuscleSelected: WorkoutType[] = [];
    workouts.forEach(w => {
      w.exercises.forEach(e => {
        const index = exercisesHaveMuscleSelected.findIndex(
          v => v.name == e.exercise_id,
        );
        const alreadyExists =
          workoutsWithMuscleSelected.findIndex(v => v._id === w._id) > -1;
        if (index > -1 && !alreadyExists) workoutsWithMuscleSelected.push(w);
      });
    });

    dispatch(filteredWorkouts(workoutsWithMuscleSelected));
  };

  return {
    filterWorkoutsByMuscle,
    muscleFilterSelected,
  };
}
