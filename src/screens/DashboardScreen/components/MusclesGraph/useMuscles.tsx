import {muscles} from '@/constants';
import {useGetExercises, useGetHistoric} from '@/domains';

import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {LineChartData} from 'react-native-chart-kit/dist/line-chart/LineChart';

export function useMuscles() {
  const [muslces, setMuscles] = useState<LineChartData>();
  const isFocused = useIsFocused();
  const {historic} = useGetHistoric([isFocused]);
  const {exercises: storageExercises} = useGetExercises();

  const filterByMuscles = () => {
    const exercisesInWokout = historic
      .map(h => h.workout.exercises.map(e => e))
      .flat();

    const exercisesWereTrained = storageExercises.filter(v => {
      const index = exercisesInWokout.findIndex(e => e.exercise_id == v.name);
      return index > -1 ? true : false;
    });

    const datasets = muscles.map((m, i) => {
      const totalTimesTrained = exercisesWereTrained.filter(v =>
        v.muscles.includes(m.toLocaleLowerCase()),
      ).length;

      return totalTimesTrained > -1 ? totalTimesTrained : 0;
    });

    const data: LineChartData = {
      labels: muscles.map(v => v.slice(0, 3)),
      datasets: [
        {
          data: datasets,
        },
      ],
    };

    setMuscles(data);
  };

  useEffect(() => {
    filterByMuscles();
  }, [historic, storageExercises]);

  return {
    muslces,
  };
}
