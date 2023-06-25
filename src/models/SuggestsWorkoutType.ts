

export type WorkoutLevel =  'begginer' | 'intermate' | 'advanced'

export type SuggestWorkoutType = {
    _id: string
    workout: string,
    level: WorkoutLevel
}