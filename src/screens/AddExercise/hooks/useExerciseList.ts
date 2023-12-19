import {useGetExercises} from '../../../domains/Exercise/useCases/useGetExercises';
import {addExercise, setExercises} from '@/features/Exercises/exerciseSlicer';
import {useAppSelector} from '@/hooks/useAppSelector';
import {initialsExercises} from '@/utils/initialsExercises';
import {useEffect, useMemo} from 'react';
import {useDispatch} from 'react-redux';

export function useExerciseList() {
  const {exercises} = useGetExercises();
  const searchExerciseInput = useAppSelector(
    state => state.exercise.searchInput,
  );
  const dispatch = useDispatch();
  const exercisList = useAppSelector(state => state.exercise.exercises);

  useEffect(() => {
    dispatch(addExercise(exercises));
  }, [exercises]);

  const exercisesSearched = useMemo(() => {
    const exercisesFiltered = [...exercises, ...initialsExercises];

    return exercisesFiltered?.filter(e =>
      e.name
        .toLocaleLowerCase()
        .includes(searchExerciseInput?.toLocaleLowerCase()),
    );
  }, [searchExerciseInput, exercises]);

  return {
    exercisList,
    exercisesSearched,
    searchExerciseInput,
  };
}
