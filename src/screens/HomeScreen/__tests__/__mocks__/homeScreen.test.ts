import {UserType, WorkoutType} from '@/models';
import {initialsExercises} from '@/constants';
const mockedDate = 123123123;
const user: UserType = {
  avatar: 'avatar',
  createdAt: mockedDate,
  uid: '321321321',
  username: 'username',
};

const workouts: WorkoutType[] = [
  {
    _id: '1',
    banner: 'banner',
    createdAt: mockedDate,
    exercises: [
      {
        exercise_id: initialsExercises[0].name,
        series: [],
      },
    ],
    title: 'title 1',
    user_id: user.uid,
  },
  {
    _id: '2',
    banner: 'banner',
    createdAt: mockedDate,
    exercises: [],
    title: 'title 2',
    user_id: user.uid,
  },
  {
    _id: '3',
    banner: 'banner',
    createdAt: mockedDate,
    exercises: [],
    title: 'title 3 ',
    user_id: user.uid,
  },
];

export const mocks = {
  user,
  workouts,
  mockedDate,
};
