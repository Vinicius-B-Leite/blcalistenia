import { createRealmContext } from "@realm/react";
import { WorkoutSchema } from "../schema/WorkoutSchema";
import { ExerciseSchema } from "../schema/ExerciseSchema";
import { SerieSchema } from "../schema/SerieSchema";
import { ExerciseWorkout } from "../schema/ExerciseWorkoutSchema";
import { SuggestWorkout } from "../schema/SuggestWorkoutSchema";
import { HistoricSchema } from "../schema/HistoricSchema";

const realmContext = createRealmContext({
    schema: [HistoricSchema, SuggestWorkout, WorkoutSchema, ExerciseSchema, SerieSchema, ExerciseWorkout],
    
});
export const { RealmProvider, useRealm, useObject, useQuery } = realmContext;