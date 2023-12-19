import {Action, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ExercisesInWorkoutType} from '../../models/ExercisesInWorkoutType';
import {SerieType} from '../../models/SerieType';
import {WorkoutType} from '../../models/WorkoutType';
// import { getRealm } from "../../services/realm"
import {ExerciseType} from '../../models/ExerciseType';

type WorkoutListState = {
  filteredWorkouts: WorkoutType[];
  musclesSelected: string;
  workouts: WorkoutType[];
};

const initalState: WorkoutListState = {
  filteredWorkouts: [],
  workouts: [],
  musclesSelected: '',
};

export const WorkoutListSlicer = createSlice({
  name: 'WorkoutList',
  initialState: initalState,
  reducers: {
    setWorkouts: (state, action: PayloadAction<WorkoutType[]>) => {
      state.workouts = action.payload;
    },
    setMuscleSelected: (state, action: PayloadAction<string>) => {
      state.musclesSelected = action.payload;
    },
    filteredWorkouts: (state, action: PayloadAction<WorkoutType[]>) => {
      state.filteredWorkouts = action.payload;
    },
    cancelFilteredWorkout: state => {
      state.filteredWorkouts = [];
    },
  },
});

export const {
  filteredWorkouts,
  cancelFilteredWorkout,
  setWorkouts,
  setMuscleSelected,
} = WorkoutListSlicer.actions;
export const workoutListReducer = WorkoutListSlicer.reducer;
