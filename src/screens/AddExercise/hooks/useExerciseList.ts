import {useGetExercises} from '@/domains';
import {addExercise} from '@/features';
import {useAppSelector} from '@/hooks';
import {initialsExercises} from '@/utils';
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
    const exerciseListIsEmpty =
      exercises.length >= 0 && exercisList.length === 0;
    if (exerciseListIsEmpty) {
      dispatch(addExercise([...exercises, ...initialsExercises]));
    }
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
