import { ExercisesInWorkoutType } from "./ExercisesInWorkoutType"


export type WorkoutType = {
    _id: string,
    title: string,
    banner: string,
    exercises: ExercisesInWorkoutType[],
    anotation?: string
}

