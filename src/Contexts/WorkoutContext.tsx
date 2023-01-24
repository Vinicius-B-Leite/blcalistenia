import React, { createContext, useState } from 'react';
import { exercisesInWorkout } from '../models/exercisesInWorkout';
import { WorkoutType } from '../models/workout';
import { getRealm } from '../services/realm';

type WorkoutContext = {
    getWorkouts: () => Promise<void>,
    createWorkout: ({ title, banner, exercises }: CreateWorkoutProps) => Promise<void>,
    workoutsList: WorkoutType[],
    getSingleWorkout: (workoutID: number) => Promise<void>,
    workout: WorkoutType | null,
    deleteWorkout: (workoutID: number) => Promise<void>
}

type CreateWorkoutProps = { title: string, banner: string, exercises: exercisesInWorkout[], anotation?: string }

export const WorkoutContext = createContext({} as WorkoutContext)


const WorkoutProvider = ({ children }: { children: React.ReactNode }) => {
    const [workoutsList, setWorkoutList] = useState<WorkoutType[]>([]);
    const [workout, setWorkout] = useState<WorkoutType | null>(null)



    const getWorkouts = async () => {

        const realm = await getRealm()


        const workout = realm.objects<WorkoutType[]>('Workout').sorted('title').toJSON()

        setWorkoutList(workout as WorkoutType[])

    }

    const createWorkout = async ({ title, banner, exercises, anotation }: CreateWorkoutProps) => {
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

    const getSingleWorkout = async (workoutID: number) => {
        const realm = await getRealm()
        setWorkout(realm.objectForPrimaryKey('Workout', workoutID as number)?.toJSON() as WorkoutType)
    }

    const deleteWorkout = async (workoutID: number) => {
        const realm = await getRealm()

        realm.write(() => {
            realm.delete(realm.objectForPrimaryKey('Workout', workoutID))
            setWorkoutList(old => {
                const index = old.findIndex((v, i) => v._id == workoutID)
                const newWorkoutList = old
                newWorkoutList.splice(index, 1)
                return [...newWorkoutList]
            })
        })


    }
    return (
        <WorkoutContext.Provider value={{
            getWorkouts,
            createWorkout,
            workoutsList,
            getSingleWorkout,
            workout,
            deleteWorkout
        }}>
            {children}
        </WorkoutContext.Provider>
    )
}

export default WorkoutProvider;