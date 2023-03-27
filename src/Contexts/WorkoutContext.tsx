import React, { createContext, useState } from 'react';
import { ExerciseType } from '../models/ExerciseType';
import { ExercisesInWorkoutType } from '../models/ExercisesInWorkoutType';
import { WorkoutType } from '../models/WorkoutType';
import { getRealm } from '../services/realm';
import { muscles } from '../utils/muscles';
import { SerieType } from '../models/SerieType';

type WorkoutContext = {
    saveWorkout: (workout: WorkoutType) => Promise<void>,
    getWorkoutsList: (text?: string) => Promise<void>,
    addExercise: (newExercise: String) => void,
    deleteExercise: (exercise: ExercisesInWorkoutType) => Promise<void>,
    deleteWorkout: (workoutID: string) => Promise<void>,
    createSerie: (exercise: ExercisesInWorkoutType) => void,
    deleteSerie: (exercise: ExercisesInWorkoutType, serie: Number) => void
    updateSerie: (serieNumber: number, exercise: ExercisesInWorkoutType, newSerie: SerieType) => void,
    filterWorkoutByMuscle: (muscle: string) => Promise<void>,
    setExercises: (old: ExercisesInWorkoutType[]) => void,
    workoutsList: WorkoutType[],
    exercises: ExercisesInWorkoutType[],
}


export const WorkoutContext = createContext({} as WorkoutContext)


const WorkoutProvider = ({ children }: { children: React.ReactNode }) => {
    const [workoutsList, setWorkoutList] = useState<WorkoutType[]>([]);
    const [exercises, setExercises] = useState<ExercisesInWorkoutType[]>([])


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
        })

    }

    const getWorkoutsList = async (text?: string) => {
        const realm = await getRealm()
        let workout = realm.objects<WorkoutType[]>('Workout').toJSON()

        if (text && text.length > 1) {
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

    const deleteExercise = async (exercise: ExercisesInWorkoutType) => {
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
        })


    }

    const createSerie = (exercise: ExercisesInWorkoutType) => {

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

    const deleteSerie = (exercise: ExercisesInWorkoutType, serie: Number) => {

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

    const updateSerie = (serieNumber: number, exercise: ExercisesInWorkoutType, newSerie: SerieType) => {

        const exerciseIndex = exercises.findIndex((v) => v.exercise_id == exercise.exercise_id)
        const serieIndex = exercises[exerciseIndex].series.findIndex((v) => v.serie == serieNumber)
        let copyExercise = [...exercises]

        copyExercise[exerciseIndex].series[serieIndex] = newSerie
        setExercises([...copyExercise])

    }

    const filterWorkoutByMuscle = async (muscle: string) => {
        const realm = await getRealm()
        const workouts = realm.objects('Workout').toJSON() as WorkoutType[]

        if (!(muscles.includes(muscle))){
            setWorkoutList(workouts)
            return
        }

        const exercises = realm.objects('Exercise').toJSON() as ExerciseType[]


        const exercisesHaveMuscleSelected = exercises.filter(e => e.muscles.includes(muscle))
        let workoutsWithMuscleSelected: WorkoutType[] = []
        
        workouts.forEach(w => {
            w.exercises.forEach(e => {
                const index = exercisesHaveMuscleSelected.findIndex(v => v.name == e.exercise_id)
                if (index > -1) workoutsWithMuscleSelected.push(w)
            })
            
        })

        setWorkoutList(workoutsWithMuscleSelected)
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
            filterWorkoutByMuscle,
            setExercises,
            workoutsList,
            exercises,
        }}>
            {children}
        </WorkoutContext.Provider>
    )
}

export default WorkoutProvider;