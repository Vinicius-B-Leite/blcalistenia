import React from 'react';
import * as S from './styles';
import {useTheme} from 'styled-components/native';
import FrequencuyChart from './FrequencuyChart';
import ExercisePregressChart from './ExercisePregressChart';
import ExercisesLevelChart from './ExercisesLevelChart';

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const data = {
    labels: ['Jan', 'Fe', 'Mar', 'Abril', 'Mai', 'Jun'],
    datasets: [
      {
        data: [1, 2, 3, 4, 5, 6],
      },
    ],
  };

  const data2 = [
    {
      name: 'Inicante',
      population: 60,
      color: theme.colors.exrtemeDarkContrast,
      legendFontColor: theme.colors.text,
      legendFontSize: 15,
    },
    {
      name: 'Média',
      population: 30,
      color: theme.colors.darkContrast,
      legendFontColor: theme.colors.text,
      legendFontSize: 15,
    },
    {
      name: 'Difícil',
      population: 10,
      color: theme.colors.contrast,
      legendFontColor: theme.colors.text,
      legendFontSize: 15,
    },
  ];
  return (
    <S.Container showsVerticalScrollIndicator={false}>
      <S.Title>Desempenho</S.Title>

      <FrequencuyChart data={data} />
      <ExercisePregressChart data={data} />
      <ExercisesLevelChart data={data2} />
    </S.Container>
  );
};

export default Dashboard;
