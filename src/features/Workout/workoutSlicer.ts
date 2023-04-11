import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ExercisesInWorkoutType } from "../../models/ExercisesInWorkoutType"
import { SerieType } from "../../models/SerieType"

type WorkoutState = {
    exercises: ExercisesInWorkoutType[],
    timer: number | null,
    isWorkingout: boolean
}

const initalState: WorkoutState = {
    exercises: [],
    timer: null,
    isWorkingout: false
}

export const workoutSlice = createSlice({
    name: 'createWorkout',
    initialState: initalState,
    reducers: {
        addExercise: (state, action: PayloadAction<ExercisesInWorkoutType | ExercisesInWorkoutType[]>) => {
            if (Array.isArray(action.payload)) {
                state.exercises.push(...action.payload)
                return
            }
            state.exercises.push(action.payload)
        },
        removeExercise: (state, action: PayloadAction<ExercisesInWorkoutType>) => {
            const index = state.exercises.findIndex(e => e.exercise_id === action.payload.exercise_id)
            state.exercises.splice(index, 1)
        },
        addSerie: (state, action: PayloadAction<ExercisesInWorkoutType>) => {
            const index = state.exercises.findIndex(e => e.exercise_id === action.payload.exercise_id)
            state.exercises[index].series.push({ rep: 0, rest: 0, serie: state.exercises[index].series.length + 1 })
        },
        removeSerie: (state, action: PayloadAction<{ exercise_id: string, serieNumber: number }>) => {
            const index = state.exercises.findIndex(e => e.exercise_id === action.payload.exercise_id)
            if (state.exercises[index].series.length === 1) {
                state.exercises.splice(index, 1)
                return
            }

            state.exercises[index].series.splice(action.payload.serieNumber - 1, 1)


            state.exercises[index].series.map(s => {
                if (Number(s.serie) > action.payload.serieNumber - 1) {
                    s.serie = Number(s.serie) - 1
                }
            })
        },
        updateSerie: (state, action: PayloadAction<{
            exercise_id: string,
            newSerie: SerieType,
            serieNumber: number
        }>) => {
            const index = state.exercises.findIndex(e => e.exercise_id === action.payload.exercise_id)

            state.exercises[index].series[action.payload.serieNumber - 1] = action.payload.newSerie
        },
        reseteExercises: (state) => {
            state.exercises = []
        },
        updateTimer: (state, action: PayloadAction<number>) => {
            if (!(state.isWorkingout)) state.isWorkingout = true
            state.timer = action.payload
        },
        resetTimer: (state) => {
            state.timer = null
            state.isWorkingout = false
        },
        
    }
})

export const {
    addExercise,
    removeExercise,
    addSerie,
    removeSerie,
    updateSerie,
    reseteExercises,
    updateTimer,
    resetTimer, } = workoutSlice.actions
export const WorkoutReducer = workoutSlice.reducer