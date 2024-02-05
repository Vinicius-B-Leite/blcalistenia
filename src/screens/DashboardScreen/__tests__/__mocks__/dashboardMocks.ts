import {HistoricType, HistoricTypeStorage} from '@/models';

const userId = '123123';
const mockedDate = 123123123;
const historicList: HistoricTypeStorage[] = [
  {
    _id: '1',
    createdAt: mockedDate,
    date: new Date(
      new Date(mockedDate).setDate(new Date(mockedDate).getDate() - 1),
    ),
    timerInSeconds: 90,
    user_id: '1',
    workout: JSON.stringify({
      _id: '1',
      banner: 'banner',
      createdAt: mockedDate,
      exercises: [
        {
          exercise_id: 'barra fixa',
          series: [
            {
              rep: '10',
              rest: '10',
              serie: 1,
              done: true,
            },
          ],
        },
      ],
      title: 'title',
      user_id: userId,
    }),
  },
  {
    _id: '2',
    createdAt: mockedDate,
    date: new Date(mockedDate),
    timerInSeconds: 90,
    user_id: '1',
    workout: JSON.stringify({
      _id: '1',
      banner: 'banner',
      createdAt: mockedDate,
      exercises: [
        {
          exercise_id: 'agachamento',
          series: [
            {
              rep: '10',
              rest: '10',
              serie: 1,
              done: true,
            },
          ],
        },
      ],
      title: 'title',
      user_id: userId,
    }),
  },
  {
    _id: '3',
    createdAt: mockedDate,
    date: new Date(
      new Date(mockedDate).setMonth(new Date(mockedDate).getMonth() + 1),
    ),
    timerInSeconds: 90,
    user_id: '1',
    workout: JSON.stringify({
      _id: '1',
      banner: 'banner',
      createdAt: mockedDate,
      exercises: [
        {
          exercise_id: 'flexão de braço',
          series: [
            {
              rep: '10',
              rest: '10',
              serie: 1,
              done: true,
            },
          ],
        },
      ],
      title: 'title',
      user_id: userId,
    }),
  },
];

export const mocks = {
  historicList,
  userId,
  mockedDate,
};
