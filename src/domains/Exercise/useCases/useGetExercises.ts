import {useEffect, useState} from 'react';
import {exerciseService} from '../exerciseService';
import {ExerciseType} from '@/models/ExerciseType';

export function useGetExercises() {
  const [exercises, setExercises] = useState<ExerciseType[]>([]);

  const fetchExercises = async () => {
    const storageExercises = await exerciseService.getExercise();

    setExercises(storageExercises);
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  return {
    exercises,
  };
}
