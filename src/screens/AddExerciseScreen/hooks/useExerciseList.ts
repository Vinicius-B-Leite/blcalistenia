import {useGetExercises} from '@/domains';
import {addExercise} from '@/features';
import {useAppSelector} from '@/hooks';
import {initialsExercises} from '@/constants';
import {useEffect, useMemo} from 'react';
import {useDispatch} from 'react-redux';

export function useExerciseList(exerciseNameSearched: string) {
  const {exercises} = useGetExercises();

  const dispatch = useDispatch();
  const exercisList = useAppSelector(state => state.exercise.exercises);

  useEffect(() => {
    const exerciseListIsEmpty =
      exercises.length >= 0 && exercisList.length === 0;
    if (exerciseListIsEmpty) {
      dispatch(addExercise([...exercises]));
    }
  }, [exercises]);

  const exercisesSearched = useMemo(() => {
    const exercisesFiltered = [...exercises];

    return exercisesFiltered?.filter(e =>
      e.name
        .toLocaleLowerCase()
        .includes(exerciseNameSearched?.toLocaleLowerCase()),
    );
  }, [exerciseNameSearched, exercises]);

  return {
    exercisList,
    exercisesSearched,
  };
}
