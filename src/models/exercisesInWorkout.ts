import { series } from './workout'

export type exercisesInWorkout = {
    exercise_id: String,
    anotatiom?: String,
    series: series[]
}