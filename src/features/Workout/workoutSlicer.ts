import { Realm } from "@realm/react"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ExercisesInWorkoutType } from "../../models/ExercisesInWorkoutType"
import { SerieType } from "../../models/SerieType"
import { WorkoutType } from "../../models/WorkoutType"
import { ExerciseType } from "../../models/ExerciseType"

type WorkoutState = {
    timer: number | null,
    isWorkingout: boolean,
    workout: WorkoutType
}

const initalState: WorkoutState = {
    timer: null,
    isWorkingout: false,
    workout: { _id: '', banner: '', exercises: [], title: '', anotation: '', user_id: '' }
}

export const workoutSlice = createSlice({
    name: 'createWorkout',
    initialState: initalState,
    reducers: {
        addExercise: (state, action: PayloadAction<ExercisesInWorkoutType | ExercisesInWorkoutType[]>) => {
            if (Array.isArray(action.payload)) {
                state.workout.exercises.push(...action.payload)
                return
            }
            state.workout.exercises.push(action.payload)
        },
        removeExercise: (state, action: PayloadAction<ExercisesInWorkoutType>) => {
            const index = state.workout.exercises.findIndex(e => e.exercise_id === action.payload.exercise_id)
            state.workout.exercises.splice(index, 1)
        },
        addSerie: (state, action: PayloadAction<ExercisesInWorkoutType>) => {
            const exerciseIndex = state.workout.exercises.findIndex(e => e.exercise_id === action.payload.exercise_id)
            const currentExercise = state.workout.exercises[exerciseIndex]
            const lengthOfSeries = currentExercise.series.length

           
            let lastSerie = currentExercise.series[lengthOfSeries - 1]
            currentExercise.series.push({ rep: lastSerie.rep, rest: lastSerie.rest, serie: lengthOfSeries + 1 })

        },
        removeSerie: (state, action: PayloadAction<{ exercise_id: string, serieNumber: number }>) => {
            const index = state.workout.exercises.findIndex(e => e.exercise_id === action.payload.exercise_id)
            if (state.workout.exercises[index].series.length === 1) {
                state.workout.exercises.splice(index, 1)
                return
            }

            state.workout.exercises[index].series.splice(action.payload.serieNumber - 1, 1)


            state.workout.exercises[index].series.map(s => {
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
            const index = state.workout.exercises?.findIndex(e => e.exercise_id === action.payload.exercise_id)

            if (index !== -1) {
                state.workout.exercises[index].series[action.payload.serieNumber - 1] = action.payload.newSerie
            }


        },
        reseteExercises: (state) => {
            state.workout.exercises = []
        },
        updateTimer: (state, action: PayloadAction<number>) => {
            if (!state.isWorkingout) {
                state.isWorkingout = true
            }
            state.timer = action.payload
        },
        resetTimer: (state) => {
            state.timer = null
            state.isWorkingout = false
            state.workout = {} as WorkoutType
        },
        setWorkout: (state, action: PayloadAction<WorkoutType>) => {
            state.workout = action.payload
        },
        updateAnotation: (state, action: PayloadAction<{ newAnotation: string, exerciseID: string }>) => {
            const index = state.workout.exercises.findIndex((v) => v.exercise_id === action.payload.exerciseID)
            if (index === -1) return

            state.workout.exercises[index].anotation = action.payload.newAnotation
        }

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
    resetTimer,
    setWorkout,
    updateAnotation } = workoutSlice.actions
export const WorkoutReducer = workoutSlice.reducer