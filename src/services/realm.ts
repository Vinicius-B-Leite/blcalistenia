import Realm from "realm";
import { ExerciseSchema } from "../schema/ExerciseSchema";
import { ExerciseWorkout } from "../schema/ExerciseWorkoutSchema";
import { HistoricSchema } from "../schema/HistoricSchema";
import { SerieSchema } from "../schema/SerieSchema";
import { SuggestWorkout } from "../schema/SuggestWorkoutSchema";
import { UserSchema } from "../schema/UserSchema";
import { WorkoutSchema } from '../schema/WorkoutSchema'

export async function getRealm(): Promise<Realm> {


    const realm = await Realm.open({
        schema: [WorkoutSchema, ExerciseSchema, SerieSchema, ExerciseWorkout, HistoricSchema, UserSchema, SuggestWorkout],
        schemaVersion: 2,
        deleteRealmIfMigrationNeeded: true,

    })
    return realm
} 