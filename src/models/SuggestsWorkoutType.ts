

export type WorkoutLevel =  'begginer' | 'intermate' | 'advanced'

export type SuggestWorkoutType = {
    workout: string,
    level: WorkoutLevel
    id: string
}