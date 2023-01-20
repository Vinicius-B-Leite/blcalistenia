
type series = {
    serie: Number,
    rep: Number,
    rest: Number
}

export type exercises = {
    name: String,
    anotation?: String,
    type: 'old' | 'rep',
    series: series[]
}

export type WorkoutType = {
    _id: Number,
    title: String,
    banner: string,
    exercises: exercises[]
}

