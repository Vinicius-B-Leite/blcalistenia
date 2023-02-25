import { SerieType } from "./SerieType"

export type ExercisesInWorkoutType = {
    exercise_id: String,
    anotatiom?: String,
    series: SerieType[]
}