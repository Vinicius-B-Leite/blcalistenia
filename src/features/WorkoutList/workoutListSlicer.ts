import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ExercisesInWorkoutType } from "../../models/ExercisesInWorkoutType"
import { SerieType } from "../../models/SerieType"
import { WorkoutType } from "../../models/WorkoutType"
// import { getRealm } from "../../services/realm"
import { ExerciseType } from "../../models/ExerciseType"

type WorkoutListState = {
    workouts: WorkoutType[]
}

const initalState: WorkoutListState = {
    workouts: []
}

export const WorkoutListSlicer = createSlice({
    name: 'WorkoutList',
    initialState: initalState,
    reducers: {
        removeWorkout: (state, action: PayloadAction<WorkoutType>) => {
            const index = state.workouts.findIndex(v => v._id === action.payload._id)
            state.workouts.splice(index, 1)
        },
        setWorkoutList: (state, action: PayloadAction<WorkoutType[]>) => {
            state.workouts = action.payload
        },

        addWorkout: (state, action: PayloadAction<WorkoutType>) => {
            const indexOfWorkout = state.workouts.findIndex(val => val._id === action.payload._id)
            if (indexOfWorkout === -1) {
                state.workouts.push(action.payload)
            }
            state.workouts[indexOfWorkout] = action.payload
        }
    }
})

export const { removeWorkout, setWorkoutList, addWorkout } = WorkoutListSlicer.actions
export const workoutListReducer = WorkoutListSlicer.reducer