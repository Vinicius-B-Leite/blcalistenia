import React, { useState } from 'react';
import { suggests } from '@/utils/suggestsWorkout';
import { WorkoutLevel } from '@/models/SuggestsWorkoutType';



export default function useWorkoutSuggest() {
    const [workoutLeveSuggest, setWorkoutLevelSuggest] = useState<WorkoutLevel>('intermate')

    const workoutSuggestFilteredByLevel = suggests.filter(v => v.level === workoutLeveSuggest)

    const handleChangeWorkoutLevel = () => {
        setWorkoutLevelSuggest(oldLevel => oldLevel === 'begginer' ? 'intermate' : 'begginer')
    }


    return {
        workoutSuggestFilteredByLevel: workoutSuggestFilteredByLevel.map(v => JSON.parse(v.workout)),
        handleChangeWorkoutLevel,
        workoutLeveSuggest
    }
}