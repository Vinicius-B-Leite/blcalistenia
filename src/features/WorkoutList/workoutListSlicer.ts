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
    upsetWorkout: (state, action: PayloadAction<WorkoutType>) => {
      const index = state.workouts.findIndex(v => v._id === action.payload._id);
      const workoutAlreadyExists = index > -1;
      if (workoutAlreadyExists) {
        state.workouts[index] = action.payload;
        return;
      }
      state.workouts.push(action.payload);
    },
    deleteWorkout: (state, action: PayloadAction<{workoutId: string}>) => {
      const index = state.workouts.findIndex(
        v => v._id === action.payload.workoutId,
      );
      if (index === -1) return;

      state.workouts.splice(index, 1);
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
  deleteWorkout,
  upsetWorkout,
} = WorkoutListSlicer.actions;
export const workoutListReducer = WorkoutListSlicer.reducer;
