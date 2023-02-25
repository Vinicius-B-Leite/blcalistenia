import { ExercisesInWorkoutType } from "./ExercisesInWorkoutType"


export type WorkoutType = {
    _id: string,
    title: String,
    banner: string,
    exercises: ExercisesInWorkoutType[],
    anotation?: String
}

