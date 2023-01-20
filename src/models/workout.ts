import { exercise } from "./exercise"

export type series = {
    serie: Number,
    rep: Number,
    rest: Number
}

export type WorkoutType = {
    _id: Number,
    title: String,
    banner: string,
    exercises: exercise[]
}

