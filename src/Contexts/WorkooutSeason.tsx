import React, { createContext, useContext, useEffect, useState } from 'react';
import { exercisesInWorkout } from '../models/exercisesInWorkout';
import { HistoricType } from '../models/HistoricType';
import { series, WorkoutType } from '../models/workout';
import { getRealm } from '../services/realm';


type WorkoutSeasonType = {
    finishWorkout: (seconds: number) => Promise<void>,
    startWorkout: (workout: WorkoutType) => void,
    createSerie: (currentExercise: exercisesInWorkout) => void,
    deleteSerie: (currentExercise: exercisesInWorkout, serieNumber: number) => void,
    changeSerie: (currentExercise: exercisesInWorkout, serieNumber: number, newSerie: series) => void,
    markSerieAsDone: (currentExercise: exercisesInWorkout, serieNumber: number) => void
}

export const WorkoutSeasonContext = createContext({} as WorkoutSeasonType)


const WorkoutSeasonProvider = ({ children }: { children: React.ReactNode }) => {

    const [workoutCopy, setWorkoutCopy] = useState<WorkoutType>()

    const finishWorkout = async (seconds: number) => {
        const realm = await getRealm()

        realm.write(() => {
            realm.delete(realm.objects('Historic'))


            realm.create<HistoricType>('Historic', {
                workout: JSON.stringify(workoutCopy),
                date: new Date(),
                timerInSeconds: seconds,
                _id: realm.objects('Historic').length + 1
            })
        })
    }

    const startWorkout = (workout: WorkoutType) => {
        workout.exercises.forEach(exercise => {
            exercise.series.forEach(serie => serie.done = false)
        })
        console.log("🚀 ~ file: WorkooutSeason.tsx:44 ~ startWorkout ~ workout", workout.exercises[0].series)

        setWorkoutCopy(workout)
    }

    const createSerie = (currentExercise: exercisesInWorkout) => {

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

    const deleteSerie = (currentExercise: exercisesInWorkout, serieNumber: number) => {
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

    const changeSerie = (currentExercise: exercisesInWorkout, serieNumber: number, newSerie: series) => {
        setWorkoutCopy(old => {
            if (old) {
                const exerciseIndex = old.exercises.findIndex((v) => v.exercise_id == currentExercise.exercise_id)
                old.exercises[exerciseIndex].series[serieNumber - 1] = newSerie
                return { ...old }
            }
        })
    }

    const markSerieAsDone = (currentExercise: exercisesInWorkout, serieNumber: number) => {
        setWorkoutCopy(old => {
            if (old){
                const exerciseIndex = old.exercises.indexOf(currentExercise)
                const serieIndex = serieNumber - 1
                old.exercises[exerciseIndex].series[serieIndex].done = !old.exercises[exerciseIndex].series[serieIndex].done
                return {...old}
            }
        })
    }
    return (
        <WorkoutSeasonContext.Provider value={{
            finishWorkout,
            startWorkout,
            createSerie,
            deleteSerie,
            changeSerie,
            markSerieAsDone
        }}>
            {children}
        </WorkoutSeasonContext.Provider>
    )
}

export default WorkoutSeasonProvider;

