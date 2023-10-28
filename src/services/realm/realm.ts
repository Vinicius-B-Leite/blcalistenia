import { createRealmContext } from "@realm/react";
import { WorkoutSchema } from "../../schema/WorkoutSchema";
import { ExerciseSchema } from "../../schema/ExerciseSchema";
import { SerieSchema } from "../../schema/SerieSchema";
import { ExerciseWorkout } from "../../schema/ExerciseWorkoutSchema";
import { SuggestWorkout } from "../../schema/SuggestWorkoutSchema";
import { HistoricSchema } from "../../schema/HistoricSchema";



const realmAccessBehavior: Realm.OpenRealmBehaviorConfiguration = {
    type: Realm.OpenRealmBehaviorType.OpenImmediately
}

export const syncConfig: Partial<Realm.SyncConfiguration> = {
    flexible: true,
    newRealmFileBehavior: realmAccessBehavior,
    existingRealmFileBehavior: realmAccessBehavior,
    onError: console.log,

}


const realmContext = createRealmContext({
    schema: [HistoricSchema, SuggestWorkout, WorkoutSchema, ExerciseSchema, SerieSchema, ExerciseWorkout],

});
export const { RealmProvider, useRealm, useObject, useQuery } = realmContext;