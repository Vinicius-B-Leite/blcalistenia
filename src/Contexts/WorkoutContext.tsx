import React, { createContext, useEffect, useState } from 'react';
import { nativeViewGestureHandlerProps } from 'react-native-gesture-handler/lib/typescript/handlers/NativeViewGestureHandler';
import { exercisesInWorkout } from '../models/exercisesInWorkout';
import { series, WorkoutType } from '../models/workout';
import { getRealm } from '../services/realm';

type WorkoutContext = {
    saveWorkout: (workout: WorkoutType) => Promise<void>,
    getWorkoutsList: (text?: string) => Promise<void>,
    addExercise: (newExercise: String) => void,
    deleteExercise: (exercise: exercisesInWorkout) => Promise<void>,
    deleteWorkout: (workoutID: string) => Promise<void>,
    createSerie: (exercise: exercisesInWorkout) => void,
    deleteSerie: (exercise: exercisesInWorkout, serie: Number) => void
    updateSerie: (serieNumber: number, exercise: exercisesInWorkout, newSerie: series) => void,
    setExercises: (old: exercisesInWorkout[]) => void,
    workoutsList: WorkoutType[],
    exercises: exercisesInWorkout[],
}


export const WorkoutContext = createContext({} as WorkoutContext)


const WorkoutProvider = ({ children }: { children: React.ReactNode }) => {
    const [workoutsList, setWorkoutList] = useState<WorkoutType[]>([]);
    const [exercises, setExercises] = useState<exercisesInWorkout[]>([])


    const saveWorkout = async ({ banner, exercises, title, anotation, _id }: WorkoutType) => {
        const realm = await getRealm()
        realm.write(() => {
            realm.create<WorkoutType>('Workout', {
                _id: _id,
                anotation: anotation,
                banner: banner,
                exercises: exercises,
                title: title
            }, Realm.UpdateMode.Modified).toJSON() as WorkoutType
            console.log('WorkoutContext - saveWorkout - id ' + _id);
            
        })

    }

    const getWorkoutsList = async (text?: string) => {
        const realm = await getRealm()
        let workout = realm.objects<WorkoutType[]>('Workout').sorted('title').toJSON()

        if (text) {
            workout = realm.objects<WorkoutType[]>('Workout').filtered(`title CONTAINS '${text}'`).toJSON()
        }
        setWorkoutList(workout as WorkoutType[])
    }

    const addExercise = async (newExercise: String) => {
        setExercises(old => [
            ...old,
            {
                exercise_id: newExercise,
                series: [
                    {
                        rep: 1,
                        rest: 1,
                        serie: 1
                    }
                ]
            }
        ])

    }

    const deleteExercise = async (exercise: exercisesInWorkout) => {
        setExercises(old => {
            let copy = [...old]
            const index = copy.indexOf(exercise)
            copy.splice(index, 1)
            return copy
        })
    }

    const deleteWorkout = async (workoutID: string) => {
        const realm = await getRealm()
        realm.write(() => {
            realm.delete(realm.objectForPrimaryKey('Workout', workoutID))
            setWorkoutList(old => {
                const index = old.findIndex((v, i) => v._id == workoutID)
                const newWorkoutList = old
                newWorkoutList.splice(index, 1)
                return [...newWorkoutList]
            })
            console.log('WorkoutContext - deleteWorkout - id ' + workoutID);

        })


    }

    const createSerie = (exercise: exercisesInWorkout) => {

        setExercises(old => {
            const index = old.indexOf(exercise)

            old[index].series.push({
                rep: 8,
                rest: 30,
                serie: old[index].series.length + 1
            })
            return [...old]
        })

    }

    const deleteSerie = (exercise: exercisesInWorkout, serie: Number) => {

        setExercises(old => {
            const indexExercise = old.indexOf(exercise)
            let seriesIndex = old[indexExercise].series.findIndex((v) => v.serie == serie)

            if (old[indexExercise].series.length == 1) {
                old.splice(indexExercise, 1)
            } else {
                old[indexExercise].series.forEach(s => {
                    if (old[indexExercise].series.findIndex(v => v.serie == s.serie) > seriesIndex) {
                        s.serie = Number(s.serie) - 1
                    }
                })

                old[indexExercise].series.splice(seriesIndex, 1)

            }
            return [...old]
        })
    }

    const updateSerie = (serieNumber: number, exercise: exercisesInWorkout, newSerie: series) => {

        const exerciseIndex = exercises.findIndex((v) => v.exercise_id == exercise.exercise_id)
        const serieIndex = exercises[exerciseIndex].series.findIndex((v) => v.serie == serieNumber)
        let copyExercise = [...exercises]

        copyExercise[exerciseIndex].series[serieIndex] = newSerie
        console.log("🚀 ~ file: WorkoutContext.tsx:177 ~ updateSerie ~ copyExercise", copyExercise)

        setExercises([...copyExercise])

    }

    return (
        <WorkoutContext.Provider value={{
            saveWorkout,
            getWorkoutsList,
            addExercise,
            deleteExercise,
            deleteWorkout,
            createSerie,
            deleteSerie,
            updateSerie,
            setExercises,
            workoutsList,
            exercises,
        }}>
            {children}
        </WorkoutContext.Provider>
    )
}

export default WorkoutProvider;