import React, { createContext, useContext, useEffect, useState } from 'react';
import { ExercisesInWorkoutType } from '../models/ExercisesInWorkoutType';
import { HistoricType } from '../models/HistoricType';
import { SerieType } from '../models/SerieType';
import { WorkoutType } from '../models/WorkoutType';
import { getRealm } from '../services/realm';
import { useTimer } from '../hooks/useTimer'

type WorkoutSeasonType = {
    finishWorkout: (seconds: number) => Promise<void>,
    cancelWorkout: () => void,
    startWorkout: (workout: WorkoutType) => void,
    createSerie: (currentExercise: ExercisesInWorkoutType) => void,
    deleteSerie: (currentExercise: ExercisesInWorkoutType, serieNumber: number) => void,
    changeSerie: (currentExercise: ExercisesInWorkoutType, serieNumber: number, newSerie: SerieType) => void,
    markSerieAsDone: (currentExercise: ExercisesInWorkoutType, serieNumber: number) => void,
    deleteExercise: (exercise: ExercisesInWorkoutType) => Promise<void>,
    workoutCopy: WorkoutType | undefined,
    timer: number
}

export const WorkoutSeasonContext = createContext({} as WorkoutSeasonType)




const WorkoutSeasonProvider = ({ children }: { children: React.ReactNode }) => {

    const [workoutCopy, setWorkoutCopy] = useState<WorkoutType>()
    const [timer, setTimer] = useState(-1)

    useEffect(() => {
        if (workoutCopy) {
            setTimeout(() => {
                setTimer(old => old + 1)
            }, 1000)
        }
    }, [timer])

    const finishWorkout = async (seconds: number) => {
        const realm = await getRealm()

        realm.write(() => {
            realm.create<HistoricType>('Historic', {
                workout: JSON.stringify(workoutCopy),
                date: new Date(),
                timerInSeconds: seconds,
                _id: realm.objects('Historic').length + 1
            })
        })

        setWorkoutCopy(undefined)
    }

    const cancelWorkout = () => {
        setWorkoutCopy(undefined)
    }

    const startWorkout = (workout: WorkoutType) => {
        if (!workoutCopy) {
            workout.exercises.forEach(exercise => {
                exercise.series.forEach(serie => serie.done = false)
            })
            setTimer(0)
            setWorkoutCopy(workout)
        }
    }

    const createSerie = (currentExercise: ExercisesInWorkoutType) => {

        setWorkoutCopy(old => {
            if (old) {
                const index = old.exercises.findIndex((v) => v.exercise_id == currentExercise.exercise_id)
                old?.exercises[index].series.push({
                    rep: 8,
                    rest: 30,
                    serie: old.exercises[index].series.length + 1
                })
                return { ...old }
            }
        })


    }

    const deleteSerie = (currentExercise: ExercisesInWorkoutType, serieNumber: number) => {
        setWorkoutCopy(old => {
            if (old) {
                const exericseIndex = old.exercises.findIndex((v) => v.exercise_id == currentExercise.exercise_id)

                if (old.exercises[exericseIndex].series.length == 1) {
                    old.exercises.splice(exericseIndex, 1)
                    return { ...old }
                }


                old.exercises[exericseIndex].series.splice(serieNumber - 1, 1)

                old.exercises[exericseIndex].series.forEach(serie => {
                    if (serie.serie > serieNumber) serie.serie = Number(serie.serie) - 1
                })

                return { ...old }
            }
        })
    }

    const changeSerie = (currentExercise: ExercisesInWorkoutType, serieNumber: number, newSerie: SerieType) => {
        setWorkoutCopy(old => {
            if (old) {
                const exerciseIndex = old.exercises.findIndex((v) => v.exercise_id == currentExercise.exercise_id)
                old.exercises[exerciseIndex].series[serieNumber - 1] = newSerie
                return { ...old }
            }
        })
    }

    const markSerieAsDone = (currentExercise: ExercisesInWorkoutType, serieNumber: number) => {
        setWorkoutCopy(old => {
            if (old) {
                const exerciseIndex = old.exercises.indexOf(currentExercise)
                const serieIndex = serieNumber - 1
                old.exercises[exerciseIndex].series[serieIndex].done = !old.exercises[exerciseIndex].series[serieIndex].done
                return { ...old }
            }
        })
    }

    const deleteExercise = async (exercise: ExercisesInWorkoutType) => {
        setWorkoutCopy(old => {
            if (old) {
                let copy = { ...old }
                const index = copy.exercises.findIndex((v) => v.exercise_id == exercise.exercise_id)
                copy.exercises.splice(index, 1)
                return copy
            }
        })
    }
    return (
        <WorkoutSeasonContext.Provider value={{
            finishWorkout,
            cancelWorkout,
            startWorkout,
            createSerie,
            deleteSerie,
            changeSerie,
            markSerieAsDone,
            deleteExercise,
            workoutCopy,
            timer
        }}>
            {children}
        </WorkoutSeasonContext.Provider>
    )
}

export default WorkoutSeasonProvider;

