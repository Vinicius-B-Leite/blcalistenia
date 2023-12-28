import {useEffect, useState} from 'react';
import {exerciseService} from '../exerciseService';
import {ExerciseType} from '@/models';

type UseGetExercisesProps = keyof Pick<ExerciseType, 'deletedAt'>;

export function useGetExercises(filter?: UseGetExercisesProps) {
  const [exercises, setExercises] = useState<ExerciseType[]>([]);

  const fetchExercises = async () => {
    const storageExercises = await exerciseService.getExercise();
    let filteredExercises = storageExercises.filter(v => !v?.deletedAt);
    if (filter) {
      filteredExercises = storageExercises.filter(v => v[filter]);
    }
    setExercises(filteredExercises);
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  return {
    exercises,
  };
}
