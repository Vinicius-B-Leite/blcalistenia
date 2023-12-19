import {useState} from 'react';
import {WorkoutType} from '@/models/WorkoutType';
import {ExerciseType} from '@/models/ExerciseType';
import {useDispatch} from 'react-redux';
import {
  cancelFilteredWorkout,
  filteredWorkouts,
  setMuscleSelected,
} from '@/features/WorkoutList/workoutListSlicer';

import {initialsExercises} from '@/utils/initialsExercises';
import {useGetWorkouts} from '../../../../domains/Workout/useCases/useGetWorkouts';
import {useGetExercises} from '../../../../domains/Exercise/useCases/useGetExercises';
import {useAppSelector} from '@/hooks/useAppSelector';

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
      ...initialsExercises.filter(e =>
        e.muscles.includes(muscle.toLowerCase()),
      ),
    ];

    let workoutsWithMuscleSelected: WorkoutType[] = [];
    workouts.forEach(w => {
      w.exercises.forEach(e => {
        const index = exercisesHaveMuscleSelected.findIndex(
          v => v.name == e.exercise_id,
        );
        if (index > -1) workoutsWithMuscleSelected.push(w);
      });
    });
    dispatch(filteredWorkouts(workoutsWithMuscleSelected));
  };

  return {
    filterWorkoutsByMuscle,
    muscleFilterSelected,
  };
}
