import {ExerciseType} from '@/models';

const adapter = (exercise: any): ExerciseType => {
  return {
    _id: exercise._id,
    categories: exercise.categories,
    muscles: exercise.muscles,
    name: exercise.name,
    user_id: exercise.user_id,
    createdAt: exercise.createdAt,
    deletedAt: exercise.deletedAt,
    updatedAt: exercise.updatedAt,
  };
};

export const exerciseAdapter = {
  adapter,
};
