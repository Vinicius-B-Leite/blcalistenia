type series = {
    serie: Number,
    rep: Number,
    rest: Number
}

type exercises = {
    name: String,
    anotation?: String,
    type: 'old' | 'rep',
    series: series[]
}

export type Workout = {
    title: String,
    banner: string,
    exercises: exercises[]
}

export type Workouts = Workout[]
