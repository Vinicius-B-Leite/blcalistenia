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

  const [rep, setRep] = useState(item?.rep || 0);
  const [rest, setRest] = useState(item?.rest || 0);
  const [done, setDone] = useState(item?.done || false);

  useEffect(() => {
    if (deleteSerieButton) {
      const newSerie: SerieType = {rep, rest, done, serie: item.serie};
      dispatch(
        updateSerie({
          exercise_id: exercise.exercise_id as string,
          newSerie,
          serieNumber: item.serie as number,
        }),
      );
    }
  }, [rep, rest, done]);

  const handleCheckSerie = () => {
    dispatch(
      updateSerie({
        exercise_id: exercise.exercise_id as string,
        newSerie: {...item, done: !done},
        serieNumber: item.serie as number,
      }),
    );
    setDone(!done);
    if (!done) {
      navigation.navigate('HomeStack', {
        screen: 'Rest',
        params: {totalSeconds: item.rest},
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

  const handleOnChangeRep = (txt: string) => setRep(Number(txt));

  const handleOnChangeRest = (txt: string) => setRest(Number(txt));

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
