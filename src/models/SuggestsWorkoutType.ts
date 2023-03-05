import { WorkoutType } from "./WorkoutType"


export type WorkoutLevel =  'begginer' | 'intermate' | 'advanced'

export type SuggestWorkoutType = {
    workout: WorkoutType,
    level: WorkoutLevel
    id: string
}