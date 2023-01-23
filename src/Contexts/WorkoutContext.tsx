import React, { createContext, useState } from 'react';
import { exercisesInWorkout } from '../models/exercisesInWorkout';
import { WorkoutType } from '../models/workout';
import { getRealm } from '../services/realm';

type WorkoutContext = {
    getWorkouts: () => Promise<void>,
    createWorkout: ({ title, banner, exercises }: CreateWorkoutProps) => Promise<void>,
    workoutsList: WorkoutType[]
}

type CreateWorkoutProps = { title: string, banner: string, exercises: exercisesInWorkout[], anotation?: string }

export const WorkoutContext = createContext({} as WorkoutContext)


const WorkoutProvider = ({ children }: { children: React.ReactNode }) => {
    const [workoutsList, setWorkoutList] = useState<WorkoutType[]>([]);


    async function getWorkouts() {

        const realm = await getRealm()
        

        const workout = realm.objects<WorkoutType[]>('Workout').sorted('title').toJSON()
        console.log("🚀 ~ file: WorkoutContext.tsx:26 ~ getWorkouts ~ workout", workout)

        setWorkoutList(workout as WorkoutType[])

    }

    async function createWorkout({ title, banner, exercises, anotation }: CreateWorkoutProps) {
        const realm = await getRealm()
        

        realm.write(() => {
            let workout = realm.create<WorkoutType>('Workout', {
                title,
                banner,
                exercises,
                anotation,
                _id: workoutsList.length + 1
            })
            setWorkoutList(old => [...old, workout as WorkoutType])
        })
    }

    return (
        <WorkoutContext.Provider value={{ getWorkouts, createWorkout, workoutsList }}>
            {children}
        </WorkoutContext.Provider>
    )
}

export default WorkoutProvider;