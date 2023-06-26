import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ExerciseType } from '../../models/ExerciseType'


type InitialStateType = {
    exercises: ExerciseType[],
    searchInput: string
}

const initialState: InitialStateType = {
    exercises: [],
    searchInput: ''
}

export const exerciseSlicer = createSlice({
    name: 'exercise',
    initialState,
    reducers: {
        setExercises: (state, action: PayloadAction<ExerciseType[]>) => {
            state.exercises = action.payload
        },
        setSearchInput: (state, action: PayloadAction<string>) => {
            state.searchInput = action.payload
        },

    }
})


export const { setExercises, setSearchInput } = exerciseSlicer.actions
export const exerciseReducer = exerciseSlicer.reducer