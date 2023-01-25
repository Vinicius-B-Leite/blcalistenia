import React, { createContext, useEffect, useState } from 'react';
import { nativeViewGestureHandlerProps } from 'react-native-gesture-handler/lib/typescript/handlers/NativeViewGestureHandler';
import { exercisesInWorkout } from '../models/exercisesInWorkout';
import { series, WorkoutType } from '../models/workout';
import { getRealm } from '../services/realm';

type WorkoutContext = {
    createInitialWorkout: () => Promise<number>,
    saveWorkout: (workout: WorkoutType) => void,
    getWorkoutsList: () => Promise<void>,
    addExercise: (newExercise: String) => void,
    getSingleWorkout: (workoutID: number) => Promise<WorkoutType>,
    deleteWorkout: (workoutID?: number) => Promise<void>,
    createSerie: (exercise: exercisesInWorkout) => void,
    deleteSerie: (exercise: exercisesInWorkout, serie: Number) => void
    clean: () => void,
    updateSerie: (serieNumber: number, exercise: exercisesInWorkout, newSerie: series) => void,
    workoutsList: WorkoutType[],
    exercises: exercisesInWorkout[],
    workout: WorkoutType
}


export const WorkoutContext = createContext({} as WorkoutContext)


const WorkoutProvider = ({ children }: { children: React.ReactNode }) => {
    const [workoutsList, setWorkoutList] = useState<WorkoutType[]>([]);
    const [exercises, setExercises] = useState<exercisesInWorkout[]>([])
    const [workout, setWorkout] = useState<WorkoutType>({ _id: -1, banner: '', exercises: [], title: '' })
    let currentKey: number

    const createInitialWorkout = () => {
        return new Promise<number>(async (resolve, reject) => {
            const realm = await getRealm()
            const key = realm.objects('Workout').length + 1

            realm?.write(() => {


                const workoutResponnse = realm.create<WorkoutType>('Workout', {
                    title: '',
                    exercises: [],
                    anotation: '',
                    banner: '',
                    _id: key
                })
                setWorkout(workoutResponnse.toJSON() as WorkoutType)
            })
            currentKey = key
            resolve(key)
        })


    } 

    const saveWorkout = async (workout: WorkoutType) => {
        const realm = await getRealm()
        realm.write(() => {

            const workoutResponse = realm.objectForPrimaryKey<WorkoutType>('Workout', workout._id as number)

            realm.create<WorkoutType>('Workout', {
                _id: workout._id,
                anotation: workout.anotation,
                banner: workout.banner,
                exercises: workout.exercises,
                title: workout.title
            }, Realm.UpdateMode.Modified)

            setWorkout(workoutResponse?.toJSON() as WorkoutType)
        })

    } 

    const getWorkoutsList = async () => {

        const realm = await getRealm()


        const workout = realm.objects<WorkoutType[]>('Workout').sorted('title').toJSON()
        
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

    const getSingleWorkout = async (workoutID: number) => {
        const realm = await getRealm()
        const workoutResponse = realm.objectForPrimaryKey('Workout', workoutID as number)?.toJSON() as WorkoutType
        setWorkout(workoutResponse)
        setExercises(workoutResponse.exercises)
        return workoutResponse
    } 

    const deleteWorkout = async (workoutID?: number) => {
        const realm = await getRealm()
        realm.write(() => {
            realm.delete(realm.objectForPrimaryKey('Workout', (workoutID || currentKey)))
            setWorkoutList(old => {
                const index = old.findIndex((v, i) => v._id == (workoutID || currentKey))
                const newWorkoutList = old
                newWorkoutList.splice(index, 1)
                return [...newWorkoutList]
            })
        })


    }  

    const createSerie = (exercise: exercisesInWorkout) => {

        setExercises(old => {
            const index = old.indexOf(exercise)
            let series = old[index].series
            series.push({
                rep: 8,
                rest: 30,
                serie: series.length + 1
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

    const clean = () => {
        setExercises([])
        setWorkout({ _id: -1, banner: '', exercises: [], title: '' })
        currentKey = -1
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
            createInitialWorkout,
            saveWorkout,
            getWorkoutsList,
            addExercise,
            getSingleWorkout,
            deleteWorkout,
            createSerie,
            deleteSerie,
            clean, 
            updateSerie,
            workoutsList,
            exercises,
            workout,
        }}>
            {children}
        </WorkoutContext.Provider>
    )
}

export default WorkoutProvider;