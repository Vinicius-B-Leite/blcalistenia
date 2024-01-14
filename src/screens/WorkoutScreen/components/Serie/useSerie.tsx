import {removeSerie, updateSerie} from '@/features';
import {useAppNavigation, useAppSelector} from '@/hooks';
import {SerieType, ExercisesInWorkoutType} from '@/models';
import {RootStackParamList} from '@/routes/Models';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

type NavigationType = StackNavigationProp<RootStackParamList, 'Workout'>;

type useSerieProps = {
  item: SerieType;
  exercise: ExercisesInWorkoutType;
  deleteSerieButton?: boolean;
};
export default function useSerie({
  item,
  exercise,
  deleteSerieButton,
}: useSerieProps) {
  const navigation = useAppNavigation();

  const dispatch = useDispatch();
  const showSucessButton = useAppSelector(state => state.workout.isWorkingout);

  const [rep, setRep] = useState(item?.rep || '');
  const [rest, setRest] = useState(item?.rest || '');
  const [done, setDone] = useState(item?.done || false);

  useEffect(() => {
    if (deleteSerieButton) {
      const newSerie: SerieType = {rep, rest, done, serie: item.serie};
      dispatch(
        updateSerie({
          exercise_id: exercise.exercise_id,
          newSerie,
          serieNumber: item.serie,
        }),
      );
    }
  }, [rep, rest, done]);

  const handleCheckSerie = () => {
    dispatch(
      updateSerie({
        exercise_id: exercise.exercise_id,
        newSerie: {...item, done: !done},
        serieNumber: item.serie,
      }),
    );
    setDone(!done);
    if (!done) {
      const numericValue = item.rest.replace(/\D/g, '');
      let totalSeconds = 0;
      if (numericValue.length <= 2) {
        totalSeconds = Number(numericValue);
      } else {
        const minutes = Number(item.rest.slice(0, 2)) * 60;
        const seconds = Number(item.rest.slice(3, 5));

        totalSeconds = Number(minutes + seconds);
      }
      navigation.navigate('HomeStack', {
        screen: 'Rest',
        params: {totalSeconds},
      });
    }
  };

  const handleDeleteSerie = () => {
    dispatch(
      removeSerie({
        exercise_id: exercise.exercise_id as string,
        serieNumber: item.serie as number,
      }),
    );
  };

  const handleOnChangeRep = (txt: string) => setRep(txt);

  const handleOnChangeRest = (txt: string) => setRest(txt);

  return {
    handleCheckSerie,
    showSucessButton,
    handleDeleteSerie,
    rep,
    done,
    rest,
    handleOnChangeRep,
    handleOnChangeRest,
  };
}
