import React, { createContext, useState } from 'react';
import { exercisesInWorkout } from '../models/exercisesInWorkout';
import { WorkoutType } from '../models/workout';
import { getRealm } from '../services/realm';

type WorkoutContext = {
    getWorkouts: () => Promise<void>,
    createWorkout: ({ title, banner, exercises }: CreateWorkoutProps) => Promise<void>,
    workoutsList: WorkoutType[]
}

type CreateWorkoutProps = { title: string, banner: string, exercises: exercisesInWorkout[] }

export const WorkoutContext = createContext({} as WorkoutContext)


const WorkoutProvider = ({ children }: { children: React.ReactNode }) => {
    const [workoutsList, setWorkoutList] = useState<WorkoutType[]>([]);


    async function getWorkouts() {

        const realm = await getRealm()

        const workout = realm.objects<WorkoutType[]>('Workout').sorted('title').toJSON()

        setWorkoutList(workout as WorkoutType[])

        realm.close()
    }

    async function createWorkout({ title, banner, exercises }: CreateWorkoutProps) {
        const realm = await getRealm()

        let workout;

        workout = realm.create<WorkoutType>('Workout', {
            title,
            banner,
            exercises,
            _id: realm.objects('Workout').length + 1
        })
        realm.close()
    }

    return (
        <WorkoutContext.Provider value={{ getWorkouts, createWorkout, workoutsList }}>
            {children}
        </WorkoutContext.Provider>
    )
}

export default WorkoutProvider;