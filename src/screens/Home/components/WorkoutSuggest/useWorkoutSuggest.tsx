import React, { useState } from 'react';
import { suggests } from '@/utils';
import { WorkoutType, WorkoutLevel } from '@/models';



export default function useWorkoutSuggest() {
    const [workoutLeveSuggest, setWorkoutLevelSuggest] = useState<WorkoutLevel>('intermate')

    const workoutSuggestFilteredByLevel: WorkoutType[] = suggests.filter(v => v.level === workoutLeveSuggest).map(v => JSON.parse(v.workout))

    const handleChangeWorkoutLevel = () => {
        setWorkoutLevelSuggest(oldLevel => oldLevel === 'begginer' ? 'intermate' : 'begginer')
    }


    return {
        workoutSuggestFilteredByLevel,
        handleChangeWorkoutLevel,
        workoutLeveSuggest
    }
}