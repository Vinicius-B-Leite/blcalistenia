import {HistoricType, UserType, WorkoutType} from '@/models';

const mockedDatetime = 123123123;
const user: UserType = {
  avatar: 'www.fake',
  username: 'user 1',
  uid: '123123',
  createdAt: mockedDatetime,
};
const workout: WorkoutType = {
  _id: '123123',
  banner: 'www.fake',
  createdAt: mockedDatetime,
  exercises: [],
  title: 'fake title',
  user_id: user.uid,
};
const historics: HistoricType[] = [
  {
    date: new Date(new Date().setDate(new Date().getDate() - 30)),
    timerInSeconds: 60,
    workout,
    _id: '0',
    user_id: user.uid,
    createdAt: mockedDatetime,
  },
  {
    date: new Date(),
    timerInSeconds: 60,
    workout: {
      ...workout,
      title: 'a single test',
    },
    _id: '1',
    user_id: user.uid,
    createdAt: mockedDatetime,
  },
];
export const mocks = {
  mockedDatetime,
  user,
  workout,
  historics,
};
