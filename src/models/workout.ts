type series = {
    serie: Number,
    rep: Number,
    rest: Number
}

type exercises = {
    _id: Number,
    name: String,
    anotation?: String,
    type: 'old' | 'rep',
    series: series[]
}

export type Workout = {
    _id: Number,
    title: String,
    banner: string,
    exercises: exercises[]
}

export type Workouts = Workout[]
