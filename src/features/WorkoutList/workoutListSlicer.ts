import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ExercisesInWorkoutType } from "../../models/ExercisesInWorkoutType"
import { SerieType } from "../../models/SerieType"
import { WorkoutType } from "../../models/WorkoutType"
import { getRealm } from "../../services/realm"
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
        filterByMuscle: (state, action: PayloadAction<{ muscle: string }>) => {
            getRealm().then(realm => {
                const workouts = realm.objects<WorkoutType[]>('Workout').toJSON() as WorkoutType[]
                const exercises = realm?.objects<ExerciseType[]>('Exercise').toJSON() as ExerciseType[]
                const exercisesHaveMuscleSelected = exercises.filter(e => e.muscles.includes(action.payload.muscle))
                let workoutsWithMuscleSelected: WorkoutType[] = []

                workouts.forEach(w => {
                    w.exercises.forEach(e => {
                        const index = exercisesHaveMuscleSelected.findIndex(v => v.name == e.exercise_id)
                        if (index > -1) workoutsWithMuscleSelected.push(w)
                    })
                })

                state.workouts = workoutsWithMuscleSelected
            })
        },
        addWorkout: (state, action: PayloadAction<WorkoutType>) => {
            state.workouts.push(action.payload)
        }
    }
})

export const { removeWorkout, setWorkoutList, filterByMuscle, addWorkout } = WorkoutListSlicer.actions
export const workoutListReducer = WorkoutListSlicer.reducer