import { exercisesInWorkout } from "./exercisesInWorkout"

export type series = {
    serie: Number,
    rep: Number,
    rest: Number,
    done?: boolean
}

export type WorkoutType = {
    _id: string,
    title: String,
    banner: string,
    exercises: exercisesInWorkout[],
    anotation?: String
}

