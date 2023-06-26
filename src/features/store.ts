import { configureStore } from '@reduxjs/toolkit'
import { WorkoutReducer } from './Workout/workoutSlicer'
import { workoutListReducer } from './WorkoutList/workoutListSlicer'

export const store = configureStore({
    reducer: {
        workout: WorkoutReducer,
        workoutList: workoutListReducer
    }
})

export type RootState = ReturnType<typeof store.getState>