import {Action, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ExercisesInWorkoutType} from '../../models/ExercisesInWorkoutType';
import {SerieType} from '../../models/SerieType';
import {WorkoutType} from '../../models/WorkoutType';
// import { getRealm } from "../../services/realm"
import {ExerciseType} from '../../models/ExerciseType';

type WorkoutListState = {
  filteredWorkouts: WorkoutType[] | null;
};

const initalState: WorkoutListState = {
  filteredWorkouts: [],
};

export const WorkoutListSlicer = createSlice({
  name: 'WorkoutList',
  initialState: initalState,
  reducers: {
    filteredWorkouts: (state, action: PayloadAction<WorkoutType[]>) => {
      state.filteredWorkouts = action.payload;
    },
    cancelFilteredWorkout: state => {
      state.filteredWorkouts = null;
    },
  },
});

export const {filteredWorkouts, cancelFilteredWorkout} =
  WorkoutListSlicer.actions;
export const workoutListReducer = WorkoutListSlicer.reducer;
