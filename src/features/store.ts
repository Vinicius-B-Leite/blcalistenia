import {configureStore} from '@reduxjs/toolkit';
import {WorkoutReducer} from './Workout/workoutSlicer';
import {workoutListReducer} from './WorkoutList/workoutListSlicer';
import {exerciseReducer} from './Exercises/exerciseSlicer';

export const store = configureStore({
  reducer: {
    workout: WorkoutReducer,
    workoutList: workoutListReducer,
    exercise: exerciseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
