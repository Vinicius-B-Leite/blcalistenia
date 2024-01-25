import {HistoricType} from '@/models';

const historicMock: HistoricType[] = [
  {
    _id: '1',
    createdAt: new Date('2024-01-25').getTime(),
    date: new Date('2024-01-26'),
    timerInSeconds: 10,
    user_id: '1',
    workout: {
      _id: '1',
      banner: 'banner',
      createdAt: new Date('2024-01-02').getTime(),
      updatedAt: new Date('2024-01-02').getTime(),
      title: 'title',
      user_id: '1',
      exercises: [
        {
          exercise_id: '1',
          anotation: 'exercise 1',
          series: [
            {
              rep: '1',
              rest: '00:00',
              serie: 1,
              done: true,
            },
          ],
        },
      ],
    },
  },
];

export const mocks = {
  historicMock,
};
