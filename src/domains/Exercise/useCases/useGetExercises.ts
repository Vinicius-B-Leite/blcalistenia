import {useEffect, useState} from 'react';
import {exerciseService} from '../exerciseService';
import {ExerciseType} from '@/models';
import {initialsExercises} from '@/constants';

type UseGetExercisesProps = keyof Pick<ExerciseType, 'deletedAt'>;

export function useGetExercises(filter?: UseGetExercisesProps) {
  const [exercises, setExercises] = useState<ExerciseType[]>([]);

  const fetchExercises = async () => {
    const storageExercises = await exerciseService.getExercise();
    const exercisesStorageWithInitials = [
      ...storageExercises,
      ...initialsExercises,
    ];
    let filteredExercises = exercisesStorageWithInitials.filter(
      v => !v?.deletedAt,
    );
    if (filter) {
      filteredExercises = exercisesStorageWithInitials.filter(v => v[filter]);
    }

    const sortedByAlphabetical = filteredExercises.sort((a, b) =>
      a.name > b.name ? 1 : -1,
    );
    setExercises(sortedByAlphabetical);
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  return {
    exercises,
  };
}
