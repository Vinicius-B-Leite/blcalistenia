import { configureStore } from '@reduxjs/toolkit'
import { WorkoutReducer } from './features/Workout/workoutSlicer'
import { workoutListReducer } from './features/WorkoutList/workoutListSlicer'

export const store = configureStore({
    reducer: {
        workout: WorkoutReducer,
        workoutList: workoutListReducer
    }
})

export type RootState = ReturnType<typeof store.getState>