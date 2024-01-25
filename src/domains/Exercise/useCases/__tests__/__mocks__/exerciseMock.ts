import {ExerciseType} from '@/models';

const exerciseMock: ExerciseType[] = [
  {
    _id: '1',
    name: 'Supino',
    categories: ['empurrar'],
    muscles: ['peitoral'],
    createdAt: Date.now(),
    user_id: '1',
  },
  {
    _id: '2',
    name: 'Remada',
    categories: ['puxar'],
    muscles: ['dorsal'],
    createdAt: Date.now(),
    user_id: '1',
  },
  {
    _id: '3',
    name: 'Desenvolvimento',
    categories: ['empurrar'],
    muscles: ['ombro'],
    createdAt: Date.now(),
    user_id: '1',
    deletedAt: Date.now(),
  },
];

export const mocks = {
  exerciseMock,
};
