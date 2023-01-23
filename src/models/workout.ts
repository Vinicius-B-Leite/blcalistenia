import { exercisesInWorkout } from "./exercisesInWorkout"

export type series = {
    serie: Number,
    rep: Number,
    rest: Number
}

export type WorkoutType = {
    _id: Number,
    title: String,
    banner: string,
    exercises: exercisesInWorkout[],
    anotation?: String
}

