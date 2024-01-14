import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {ExerciseType} from '@/models';

type InitialStateType = {
  exercises: ExerciseType[];
};

const initialState: InitialStateType = {
  exercises: [],
};

export const exerciseSlicer = createSlice({
  name: 'exercise',
  initialState,
  reducers: {
    setExercises: (state, action: PayloadAction<ExerciseType[]>) => {
      state.exercises = action.payload;
    },
    addExercise: (
      state,
      action: PayloadAction<ExerciseType | ExerciseType[]>,
    ) => {
      if (Array.isArray(action.payload)) {
        state.exercises = [...state.exercises, ...action.payload];
        return;
      }
      state.exercises.push(action.payload);
    },
    deleteExercise: (state, action: PayloadAction<{exerciseId: string}>) => {
      const index = state.exercises.findIndex(
        v => v._id === action.payload.exerciseId,
      );

      if (index !== -1) {
        state.exercises.splice(index, 1);
      }
    },
  },
});

export const {setExercises, addExercise, deleteExercise} =
  exerciseSlicer.actions;
export const exerciseReducer = exerciseSlicer.reducer;
