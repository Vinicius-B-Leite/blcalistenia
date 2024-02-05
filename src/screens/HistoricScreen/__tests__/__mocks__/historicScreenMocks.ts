import {HistoricTypeStorage, WorkoutType} from '@/models';

const mockedDate = 123123123;
const userId = '1';
const workouts: WorkoutType[] = [
  {
    _id: '1',
    title: 'Treino de força',
    banner: 'url_da_imagem',
    exercises: [],
    user_id: userId,
    createdAt: mockedDate,
  },
  {
    _id: '2',
    title: 'Treino de resistência',
    banner: 'url_da_imagem',
    exercises: [],
    anotation: 'Foco em resistência muscular',
    user_id: userId,
    createdAt: mockedDate,
  },
  {
    _id: '3',
    title: 'Treino de flexibilidade',
    banner: 'url_da_imagem',
    exercises: [],
    user_id: userId,
    createdAt: mockedDate,
    updatedAt: mockedDate,
  },
];
const historic: HistoricTypeStorage[] = [
  {
    _id: '1',
    createdAt: 123123123,
    date: new Date(
      new Date(mockedDate).setDate(new Date(mockedDate).getDate() - 2),
    ),
    timerInSeconds: 60,
    user_id: userId,
    workout: JSON.stringify(workouts[0]),
  },
  {
    _id: '2',
    createdAt: 123123123,
    date: new Date(
      new Date(mockedDate).setDate(new Date(mockedDate).getDate() - 1),
    ),
    timerInSeconds: 60,
    user_id: userId,
    workout: JSON.stringify(workouts[1]),
  },
  {
    _id: '3',
    createdAt: 123123123,
    date: new Date(mockedDate),
    timerInSeconds: 60,
    user_id: userId,
    workout: JSON.stringify(workouts[2]),
  },
];

export const mocks = {
  workouts,
  historic,
  userId,
  mockedDate,
};
