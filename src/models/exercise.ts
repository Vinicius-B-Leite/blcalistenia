import { series } from "./workout"

export type exercise = {
    name: String,
    anotation?: String,
    type: 'old' | 'rep',
    series?: series[],
    muscles: String
}
