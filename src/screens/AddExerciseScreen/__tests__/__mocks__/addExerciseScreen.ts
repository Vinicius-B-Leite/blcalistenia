import {ExerciseType, UserType} from '@/models';

const user: UserType = {
  uid: '1',
  createdAt: Date.now(),
  username: 'username',
  avatar: 'avatar',
};
const newExercise: ExerciseType = {
  _id: '1',
  name: 'exercise',
  categories: ['empurrar'],
  muscles: ['Antebraço'],
  createdAt: Date.now(),
  user_id: '1',
};

export const mocks = {
  user,
  newExercise,
};
