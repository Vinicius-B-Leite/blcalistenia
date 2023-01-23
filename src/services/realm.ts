import Realm from "realm";
import { ExerciseSchema } from "../schema/ExerciseSchema";
import { ExerciseWorkout } from "../schema/ExerciseWorkoutSchema";
import { SerieSchema } from "../schema/SerieSchema";
import { WorkoutSchema } from '../schema/WorkoutSchema'

export function getRealm(): Promise<Realm> {
    return new Promise(async (resolve, reject) => {

        try {

            const realm = await Realm.open({
                schema: [WorkoutSchema, ExerciseSchema, SerieSchema, ExerciseWorkout],
                schemaVersion: 1,
                deleteRealmIfMigrationNeeded: true,
                
            })
            resolve(realm)

        } catch (error) {
            reject(error)
        }


    })
} 