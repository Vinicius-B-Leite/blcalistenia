import Realm from "realm";
import { ExerciseSchema } from "../schema/ExerciseSchema";
import { SerieSchema } from "../schema/SerieSchema";
import { WorkoutSchema } from '../schema/WorkoutSchema'

export function getRealm(): Promise<Realm> {
    return new Promise(async (resolve, reject) => {

        try {

            const realm = await Realm.open({
                schema: [WorkoutSchema, ExerciseSchema, SerieSchema],
                schemaVersion: 7,
            })

            resolve(realm)

        } catch (error) {
            reject(error)
        }


    })
} 