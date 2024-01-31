import {WorkoutType} from '@/models';

const mockedDatetime = 123123123;
const workouts: WorkoutType[] = [
  {
    _id: '1',
    banner: 'www.fake',
    createdAt: mockedDatetime,
    exercises: [],
    title: 'fake title',
    user_id: '123123',
  },
  {
    _id: '2',
    banner: 'www.fake',
    createdAt: mockedDatetime,
    exercises: [
      {
        exercise_id: '1',
        series: [],
        anotation: 'fake anotation',
      },
    ],
    title: 'fake title',
    user_id: '123123',
    deletedAt: mockedDatetime,
  },
];

export const mocks = {
  workouts,
  mockedDatetime,
};
