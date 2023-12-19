import {ExerciseType} from '@/models/ExerciseType';

const adapter = (exercise): ExerciseType => {
  return {
    _id: exercise._id,
    categories: exercise.categories,
    muscles: exercise.muscles,
    name: exercise.name,
    user_id: exercise.user_id,
  };
};

export const exerciseAdapter = {
  adapter,
};
